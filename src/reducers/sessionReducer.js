import { GET_SESSION_STARTED, 
         GET_SESSION_SUCCESS,
         GET_SESSION_FAILURE,
         RESET_SESSION} from "../actions/ActionTypes";

  const initialState = { 
    loading: false,
    isError: false,
    authenticated: false,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

    case GET_SESSION_STARTED:
      return {
        ...state,
      }

    case GET_SESSION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }

    case GET_SESSION_FAILURE:
      return {
        ...state,
        ...action.payload,
      }

    case RESET_SESSION:
      return {
        ...initialState,
        ...action.payload,
      }

    default:
      return state;
    }
  }