import {
  GET_SESSION_STARTED,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAILURE,
  RESET_SESSION
} from "./ActionTypes";
 
export const clearSession = () => ({
  type: RESET_SESSION,
  payload: {
    loading: false,
    isError: false,
  }
});

export const getSessionStarted = () => ({
  type: GET_SESSION_STARTED,
  payload: {
    loading: true,
    isError: false,
  }
});

export const getSessionSuccess = session => ({
  type: GET_SESSION_SUCCESS,
  payload: {
    ...session,
    loading: false,
    isError: false,
  }
});

export const getSessionFailure = error => ({
  type: GET_SESSION_FAILURE,
  payload: {
    error: {...error},
    loading: false,
    isError: true,
  }
});
