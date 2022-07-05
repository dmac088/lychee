import {
    GET_SHIPPING_TYPES_STARTED,
    GET_SHIPPING_TYPES_SUCCESS,
    GET_SHIPPING_TYPES_FAILURE,
} from "./ActionTypes";


const initialState = {
    loading: true,
    error: {},
};


export const getShippingTypeStarted = () => ({
    type: GET_SHIPPING_TYPES_STARTED,
    payload: {
        loading: true,
    }
});

export const getShippingTypeSuccess = types => ({
    type: GET_SHIPPING_TYPES_SUCCESS,
    payload: {
        loading: false,
        ...types,
    }
});

export const getShippingTypeFailure = error => ({
    type: GET_SHIPPING_TYPES_FAILURE,
    payload: {
        error,
        loading: false,
    }
});
