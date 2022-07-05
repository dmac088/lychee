import {  GET_CATEGORIES_STARTED,
          GET_CATEGORIES_SUCCESS,
          GET_CATEGORIES_FAILURE,
          GET_CATEGORY_STARTED,
          GET_CATEGORY_SUCCESS,
          GET_CATEGORY_FAILURE} from "./ActionTypes";

export const getCategoriesStarted = () => ({
  type: GET_CATEGORIES_STARTED,
  payload: {
    loading: true,
  }
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: {
    list: categories,
    loading: false,
  }
});

export const getCategoriesFailure = error => ({
  type: GET_CATEGORIES_FAILURE,
  payload: {
    error,
    loading: false,
  }
});

export const getCategoryStarted = () => ({
  type: GET_CATEGORY_STARTED
});

export const getCategorySuccess = categories => ({
  type: GET_CATEGORY_SUCCESS,
  payload: {
    list: categories,
    loading: false,
  }
});

export const getCategoryFailure = error => ({
  type: GET_CATEGORY_FAILURE,
  payload: {
    error,
  }
});