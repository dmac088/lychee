import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingDestinationsStarted,
    getShippingDestinationsSuccess,
    getShippingDestinationsFailure,
} from "../../../actions/ShippingDesinationActions";

export const getShippingDestinations = () => {
    return (dispatch, getState) => {
        dispatch(getShippingDestinationsStarted());
        return axios.get(getState().discovery.links.getShippingDestinations.href)
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
