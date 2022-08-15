import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProductStarted,
    getShippingProductSuccess,
    getShippingProductFailure,
} from "../../../actions/ShippingProductActions";
import { parseTemplate } from 'url-template';

//we inject the selected destination to get the relevant types
//https://sv2.io:8090/api/Product/{locale}/{currency}/Destination/{code}/Type/{type}

export const getShippingProduct = (destCode, typeCode) => {
    return (dispatch, getState) => {
        dispatch(getShippingProductStarted());
        const { href } = getState().bag._links.getShippingProduct;
        const uri = parseTemplate(href).expand({
            "code": destCode,
            "type": typeCode,
        });
        return axios.get(uri).then((payload) => {
            return payload.data;
        }).then((product) => {
            dispatch(getShippingProductSuccess(product));
        }).catch((error) => {
            dispatch(getShippingProductFailure(error.response));
        });
    }
}