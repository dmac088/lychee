import {
  GET_CUSTOMER_STARTED,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  REGISTER_CUSTOMER_STARTED,
  REGISTER_CUSTOMER_SUCCESS,
  REGISTER_CUSTOMER_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
    loading: false,
    isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_CUSTOMER_STARTED:
      return {
        ...state,
        ...action.payload,
    }

    case REGISTER_CUSTOMER_SUCCESS:
      return {
        ...state,
        ...action.payload,
    }

    case REGISTER_CUSTOMER_FAILURE:
      return {
        ...state,
        ...action.payload,
    }

    case GET_CUSTOMER_STARTED:
      return {
        ...state,
        ...action.payload,
    }

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        ...action.payload,
    }

    case GET_CUSTOMER_FAILURE:
      return {
        ...state,
        ...action.payload,
    }

    default:
      return state;
  }
}
 