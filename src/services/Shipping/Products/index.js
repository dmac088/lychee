import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProductStarted,
    getShippingProductSuccess,
    getShippingProductFailure,
} from "../../../actions/ShippingProductActions";
import { parseTemplate } from 'url-template';
import { Link } from "react-router-dom";

export const getShippingProduct = (destCode, typeCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingProductStarted());
        return axios.get(getState().discovery.links.shippingResource.href)
            .then((response) => {
                const { href } = response.data._links.fee;
                const uri = parseTemplate(href).expand({
                    "locale": locale,
                    "currency": currency,
                    "code": destCode,
                    "type": typeCode,
                });
                return uri;
            })
            .then((link) => axios.get(link))
            .then((payload) => {
                return payload.data;
            }).then((product) => {
                dispatch(getShippingProductSuccess(product));
            }).catch((error) => {
                dispatch(getShippingProductFailure(error.response));
            });
    }
}
