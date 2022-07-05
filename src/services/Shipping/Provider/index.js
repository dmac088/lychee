import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingProviderStarted,
    getShippingProviderSuccess,
    getShippingProviderFailure,
} from "../../../actions/ShippingProviderActions";


export const getShippingProviders = () => {
    return (dispatch, getState) => {
        dispatch(getShippingProviderStarted());
        return axios.get(getState().discovery.links.getShippingProviders.href)
            .then((payload) => {
                return payload.data;
            }).then((providers) => {
                dispatch(getShippingProviderSuccess(providers));
            }).catch((error) => {
                dispatch(getShippingProviderFailure(error.response));
            });
    }
}
