
import { instance as axios } from "../../components/Layout/Helpers/api";
import { parseTemplate } from 'url-template';
import {
  regCustomerStarted,
  regCustomerSuccess,
  regCustomerFailure,
  getCustomerStarted,
  getCustomerSuccess,
  getCustomerFailure
} from '../../actions/CustomerActions'
import { localisation } from "../api";

export const findByUserName = () => {
  return (dispatch, getState) => {

    const { href } = getState().discovery.links.customerResource;

    dispatch(getCustomerStarted());
   return axios.get(href)
      .then((response) => {
        return axios.get(response.data._links.customer.href);
      })
      .then((response) => {
        dispatch(getCustomerSuccess(response));
      }).catch((error) => {
        dispatch(getCustomerFailure(error.response));
      });
  }
}

export const register = (customer, locale, currency) => {
  return (dispatch, getState) => {
    const { href } = getState().discovery.links.customerResource;
    dispatch(regCustomerStarted());
    return axios.get(href)
      .then((response) => {
        return axios.post(parseTemplate(response.data._links.register.href).expand({
          ...localisation,
          "locale": locale,
          "currency": currency
        }), customer)
          .then(() => {
            dispatch(regCustomerSuccess(customer));
          })
          .catch((error) => {
            dispatch(regCustomerFailure(error.response.data));
          });
      })
  }
}


  // export const confirm = () => {
  //   return (dispatch, getState) => {
  
  //     const state = getState();
  //     const { href } = state.discovery.links.confirmRegistration;
  
  //     dispatch(regCustomerStarted());
  
  //     axios.post(href, customer)
  //       .then(() => {
  //         dispatch(regCustomerSuccess(customer));
  //       })
  //       .then(() => {
  //         dispatch(authenticate(customer.userName, customer.password));
  //       })
  //       .catch((error) => {
  //         dispatch(regCustomerFailure(error.response));
  //       });
  //   }
  // }