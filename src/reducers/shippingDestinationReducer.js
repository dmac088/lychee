import {
    GET_SHIPPING_DESTINATIONS_STARTED,
    GET_SHIPPING_DESTINATIONS_SUCCESS,
    GET_SHIPPING_DESTINATIONS_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
    loading: true,
    error: {},
};

const DEFAULT_SELECTION = {data: {countryCode: 'NA', countryDesc: '--Select--'}};

export default function (state = initialState, action) {
  
    switch (action.type) {

      case GET_SHIPPING_DESTINATIONS_STARTED:
        return {
          ...state,
          ...action.payload,
      }
  
      case GET_SHIPPING_DESTINATIONS_SUCCESS:
        return {
          ...state,
         data: { _embedded: {
            shippingCountryResources: [
              DEFAULT_SELECTION,...action.payload.data._embedded.shippingCountryResources
            ]
          }
        },
          loading: false,
      }
  
      case GET_SHIPPING_DESTINATIONS_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
      }
  
      default:
        return state;
    }
  }
   
