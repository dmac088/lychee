import {
  GET_SHIPPING_TYPES_STARTED,
  GET_SHIPPING_TYPES_SUCCESS,
  GET_SHIPPING_TYPES_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
  loading: true,
  error: {},
};

const DEFAULT_SELECTION = {data: {code: 'NA', name: '--Select--'}};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_SHIPPING_TYPES_STARTED:
      return {
        ...state,
    }

    case GET_SHIPPING_TYPES_SUCCESS:
      return {
        _embedded: {
          shippingCodeResources: [
            DEFAULT_SELECTION,...action.payload._embedded.shippingCodeResources
          ]
        },
        loading: false,
    }

    case GET_SHIPPING_TYPES_FAILURE:
      return {
        ...state,
        error: action.payload.error,  
        loading: false,
    }

    default:
      return state;
  }
}