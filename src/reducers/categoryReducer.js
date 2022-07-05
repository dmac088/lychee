import { GET_CATEGORY_STARTED,
         GET_CATEGORY_SUCCESS,
         GET_CATEGORY_FAILURE } from "../actions/ActionTypes";

  const initialState = {
    category: {} ,
    loading: true,
    error: {},
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CATEGORY_STARTED:
        return {
          ...state,
          loading: true,
        }

      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          ...action.payload,
          loading: false,
        };

      case GET_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }

      default:
        return state;
    }
  }
