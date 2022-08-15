import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingDestinationsStarted,
    getShippingDestinationsSuccess,
    getShippingDestinationsFailure,
} from "../../../actions/ShippingDesinationActions";
import { parseTemplate } from 'url-template';
import { localisation } from "../../api";

export const getShippingDestinations = (locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingDestinationsStarted());
        const { href } = getState().bag._links.getShippingDestinations;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency,
        });
        return  axios.get(link)
        .then((payload) => {
            return payload.data;
        }).then((providers) => {
            dispatch(getShippingDestinationsSuccess(providers));
        }).catch((error) => {
            dispatch(getShippingDestinationsFailure(error.response));
        });
    }
}

export const findByCode = (destinations, code) => {
    if (!destinations) { return; }
    if(!code) { return; }
    return destinations.filter(o => o.data.productDestinationCode === code)[0];
}
