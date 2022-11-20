import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProductStarted,
    getShippingProductSuccess,
    getShippingProductFailure,
} from "../../../actions/ShippingProductActions";
import { parseTemplate } from 'url-template';

export const getShippingProduct = (countryCode, shipCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingProductStarted());
        return axios.get(getState().discovery.links.shippingResource.href)
            .then((response) => {
                const { href } = response.data._links.fee;
                const uri = parseTemplate(href).expand({
                    "locale": locale,
                    "currency": currency,
                    "countryCode": countryCode,
                    "shipCode": shipCode
                });
                return uri;
            })
            .then((link) => axios.get(link))
            .then((payload) => {
                return payload.data;
            }).then((product) => {
                dispatch(getShippingProductSuccess(product, countryCode, shipCode));
            }).catch((error) => {
                dispatch(getShippingProductFailure(error.response));
            });
    }
}
