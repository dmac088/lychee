import {
    GET_SHIPPING_PRODUCT_STARTED,
    GET_SHIPPING_PRODUCT_SUCCESS,
    GET_SHIPPING_PRODUCT_FAILURE,
} from "./ActionTypes";

export const getShippingProductStarted = () => ({
    type: GET_SHIPPING_PRODUCT_STARTED,
    payload: {
        loading: true,
    }
});

export const getShippingProductSuccess = (shippingProduct, dest, type) => ({
    type: GET_SHIPPING_PRODUCT_SUCCESS,
    payload: {
        loading: false,
        shippingDestination: dest,
        shippingType: type,
        ...shippingProduct,
    }
});

export const getShippingProductFailure = error => ({
    type: GET_SHIPPING_PRODUCT_FAILURE,
    payload: {
        error: {...error},
        loading: false,
    }
});