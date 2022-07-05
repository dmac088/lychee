import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProductStarted,
    getShippingProductSuccess,
    getShippingProductFailure,
} from "../../../actions/ShippingProductActions";

//we inject the selected destination to get the relevant types
//https://localhost:8090/api/Product/{locale}/{currency}/Destination/{code}/Type/{type}

export const getShippingProduct = (destCode, typeCode) => {  
    return (dispatch, getState) => {
        dispatch(getShippingProductStarted());
       return axios.get(getState().discovery.links.getShippingProduct.href.replace('{code}', destCode)
                                                                         .replace('{type}', typeCode))
       .then((payload) => {
           return payload.data;
       }).then((product) => {
           dispatch(getShippingProductSuccess(product));
       }).catch((error) => {
           dispatch(getShippingProductFailure(error.response));
       });
    }
}