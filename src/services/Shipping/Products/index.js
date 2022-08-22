import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProductStarted,
    getShippingProductSuccess,
    getShippingProductFailure,
} from "../../../actions/ShippingProductActions";
import { parseTemplate } from 'url-template';

export const getShippingProduct = (destCode, typeCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingProductStarted());
        const { href } = getState().bag._links.getShippingProduct;
        const uri = parseTemplate(href).expand({
            "locale": locale, 
            "currency": currency,
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
