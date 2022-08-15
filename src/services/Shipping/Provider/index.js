import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProviderStarted,
    getShippingProviderSuccess,
    getShippingProviderFailure,
} from "../../../actions/ShippingProviderActions";
import { parseTemplate } from 'url-template';
import { localisation } from "../../api";


export const getShippingProviders = (locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingProviderStarted());
        const { href } = getState().bag._links.getShippingProviders;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency,
        });
        return axios.get(link)
            .then((payload) => {
                return payload.data;
            }).then((providers) => {
                dispatch(getShippingProviderSuccess(providers));
            }).catch((error) => {
                dispatch(getShippingProviderFailure(error.response));
            });
    }
}
