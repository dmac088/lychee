import { instance as axios } from "../../components/Layout/Helpers/api";
import {
  clearSession,
  getSessionStarted,
  getSessionSuccess
} from '../../actions/SessionActions';
import LocalStorageService from '../../components/Layout/Helpers/storage/token';
import * as apiConfig from '../api';
import { parseTemplate } from 'url-template';



export const confirm = (token) => {
  return (dispatch, getState) => {
    const { href } = getState().discovery.links.customerResource;
    return axios.get(href)
    .then((response) => {
      return axios.get(parseTemplate(response.data._links.confirm.href).expand({
        "token": token
      }))
    })
  }
}


export const authenticate = (username, password) => {
  return (dispatch, getState) => {
    const localStorageService = LocalStorageService.getService();

    const { href } = getState().discovery.links.customerResource;

    const form = new FormData();
    Object.keys(apiConfig.formData).forEach((key) => {
      form.append(key, apiConfig.formData[key])
    });

    form.append('username', username);
    form.append('password', password);

    dispatch(getSessionStarted());

    return axios.get(href)
    .then((response) => {
      return axios({
        method: "post",
        crossDomain: true,
        url: response.data._links.token.href,
        data: form,
        ...apiConfig.config
      })
    }).then((response) => {
      dispatch(getSessionSuccess(response.data));
      localStorageService.setToken(response.data);
    })
  }
}

export const reauthenticate = () => {
  return (dispatch, getState) => {

    const localStorageService = LocalStorageService.getService();
    const { href } = getState().discovery.links.token;
    const refreshToken = localStorageService.getRefreshToken();

    const form = new FormData();
    form.append('refresh_token', refreshToken);
    form.append('grant_type', 'refresh_token');

    if (!refreshToken) {
      console.log("No refresh token found in localstorage");
      return new Promise((resolve) => { return resolve(); });
    }

    return axios({
      method: "post",
      crossDomain: true,
      url: href,
      data: form,
      ...apiConfig.config
    })
      .then(response => {
        if (response.status === 200) {
          console.log('assigning new access token to further requests.....');
          dispatch(refreshTokens(response.data));
          localStorageService.setToken(response.data);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        }
      })
      .catch((error) => {
        dispatch(logoutSession());
      });
  }
}

export const refreshTokens = (data) => {
  return (dispatch) => {
    dispatch(getSessionSuccess(data));
  }
}

export const logoutSession = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      const localStorageService = LocalStorageService.getService();
      //clear tokens from local storage
      localStorageService.clearToken();
      //clear session state in redux
      resolve(dispatch(clearSession()));
    });
  };
}
