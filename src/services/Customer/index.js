
import { instance as axios } from "../../components/Layout/Helpers/api";
import {
  regCustomerStarted,
  regCustomerSuccess,
  regCustomerFailure,
  getCustomerStarted,
  getCustomerSuccess,
  getCustomerFailure
} from '../../actions/CustomerActions'
import { authenticate } from '../Session';

export const findByUserName = (discovery, session) => {
  return (dispatch) => {
    const { userName } = session;
    const { href } = discovery.links.getCustomer;
    
    dispatch(getCustomerStarted());

   return axios.get(href.replace('{username}', userName))
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