import {
  GET_SHIPPING_PRODUCT_STARTED,
  GET_SHIPPING_PRODUCT_SUCCESS,
  GET_SHIPPING_PRODUCT_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
  loading: false,
  error: {},
};

export default function (state = initialState, action) {

  switch (action.type) {

    case GET_SHIPPING_PRODUCT_STARTED:
      return {
        ...state,
        ...action.payload,
        loading: true,
    }

    case GET_SHIPPING_PRODUCT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
    }

    case GET_SHIPPING_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
    }

    default:
      return state;
  }
}