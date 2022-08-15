
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

export const findByUserName = () => {
  return (dispatch, getState) => {
    
    const { userName } = getState().session;
    const { href } = getState().discovery.links.customerResource;

    dispatch(getCustomerStarted());

   return axios.get(parseTemplate(href).expand({
                  "username": userName
                  }))
      .then((response) => {
        dispatch(getCustomerSuccess(response));
      }).catch((error) => {
        dispatch(getCustomerFailure(error.response));
      });
  }
}

export const register = customer => {
  return (dispatch, getState) => {

    const state = getState();
    const { href } = state.discovery.links.registerCustomer;
    dispatch(regCustomerStarted());
    
   return  axios.post(href, customer)
      .then(() => {
        dispatch(regCustomerSuccess(customer));
      })
      .catch((error) => {
        dispatch(regCustomerFailure(error.response.data));
      });
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