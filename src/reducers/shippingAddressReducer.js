import {
    GET_SHIPPING_ADDRESS_STARTED,
    GET_SHIPPING_ADDRESS_SUCCESS,
    GET_SHIPPING_ADDRESS_FAILURE,
  } from "../actions/ActionTypes";
  
  const initialState = {
      loading: true,
      error: {},
  };
  
  export default function (state = initialState, action) {
  
    switch (action.type) {

      case GET_SHIPPING_ADDRESS_STARTED:
        return {
          ...state,
          ...action.payload,
      }
  
      case GET_SHIPPING_ADDRESS_SUCCESS:
        return {
          ...state,
          ...action.payload,
          loading: false,
      }
  
      case GET_SHIPPING_ADDRESS_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
      }
  
      default:
        return state;
    }
  }
   