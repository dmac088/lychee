
import {
  EMPTY_BAG_CONTENTS,
  GET_BAG_CONTENTS_STARTED,
  GET_BAG_CONTENTS_SUCCESS,
  GET_BAG_CONTENTS_FAILURE,
  ADD_BAG_ITEM_STARTED,
  ADD_BAG_ITEM_SUCCESS,
  ADD_BAG_ITEM_FAILURE,
  REMOVE_BAG_ITEM_STARTED,
  REMOVE_BAG_ITEM_SUCCESS,
  REMOVE_BAG_ITEM_FAILURE,
  UPDATE_BAG_ITEM_STARTED,
  UPDATE_BAG_ITEM_SUCCESS,
  UPDATE_BAG_ITEM_FAILURE,
  ADD_SHIPPING_STARTED,
  ADD_SHIPPING_SUCCESS,
  ADD_SHIPPING_FAILURE,
  UPDATE_SHIPPING_STARTED,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_SHIPPING_FAILURE,
} from "./ActionTypes";

export const emptyBagContents = () => ({
  type: EMPTY_BAG_CONTENTS
});

export const getBagContentsStarted = () => ({
  type: GET_BAG_CONTENTS_STARTED,
  payload: {
    loading: true,
  }
});

export const getBagContentsSuccess = items => ({
  type: GET_BAG_CONTENTS_SUCCESS,
  payload: {
    items: items,
    loading: false,
  }
});

export const getBagContentsFailure = error => ({
  type: GET_BAG_CONTENTS_FAILURE,
  payload: {
    error,
    loading: false,
  }
});

export const addBagItemStarted = () => ({
  type: ADD_BAG_ITEM_STARTED,
  payload: {
    loading: true,
  }
});

export const addBagItemSuccess = productCode => ({
  type: ADD_BAG_ITEM_SUCCESS,
  payload: {
    productCode: productCode,
    loading: false,
  }
});

export const addBagItemFailure = error => ({
  type: ADD_BAG_ITEM_FAILURE,
  payload: {
    error,
    loading: false,
  }
});

export const removeBagItemStarted = () => ({
  type: REMOVE_BAG_ITEM_STARTED,
  payload: {
    loading: true,
  }
});

export const removeBagItemSuccess = productCode => ({
  type: REMOVE_BAG_ITEM_SUCCESS,
  payload: {
    productCode: productCode,
    loading: false,
  }
});

export const removeBagItemFailure = error => ({
  type: REMOVE_BAG_ITEM_FAILURE,
  payload: {
    error,
    loading: false,
  }
});

export const updateBagItemStarted = () => ({
  type: UPDATE_BAG_ITEM_STARTED,
  payload: {
    loading: true,
  }
});

export const updateBagItemSuccess = productCode => ({
  type: UPDATE_BAG_ITEM_SUCCESS,
  payload: {
    productCode: productCode,
    loading: false,
  }
});

export const updateBagItemFailure = error => ({
  type: UPDATE_BAG_ITEM_FAILURE,
  payload: {
    error,
    loading: false,
  }
});

export const addShippingStarted = () => ({
  type: ADD_SHIPPING_STARTED,
  payload: {
      loading: true,
  }
});

export const addShippingSuccess = () => ({
  type: ADD_SHIPPING_SUCCESS,
  payload: {
      loading: false,
  }
});

export const addShippingFailure = error => ({
  type: ADD_SHIPPING_FAILURE,
  payload: {
      error,
      loading: false,
  }
});

export const updateShippingStarted = () => ({
  type: UPDATE_SHIPPING_STARTED,
  payload: {
      loading: true,
  }
});

export const updateShippingSuccess = shipping => ({
  type: UPDATE_SHIPPING_SUCCESS,
  payload: {
      loading: false,
      ...shipping,
  }
});

export const updateShippingFailure = error => ({
  type: UPDATE_SHIPPING_FAILURE,
  payload: {
      error,
  }
});