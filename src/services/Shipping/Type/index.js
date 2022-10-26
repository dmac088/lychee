import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingTypeStarted,
    getShippingTypeSuccess,
    getShippingTypeFailure,
} from "../../../actions/ShippingTypeActions";
import { parseTemplate } from 'url-template';
import { localisation } from "../../api";

//we inject the selected destination to get the relevant types
export const getShippingType = (destinationCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getShippingTypeStarted());
        return axios.get(getState().discovery.links.shippingResource.href)
            .then((response) => {
                const { href } = response.data._links.shipCodes;
                const link = parseTemplate(href).expand({
                    ...localisation,
                    "locale": locale,
                    "currency": currency,
                    "destination": destinationCode,
                })
                return link
            })
            .then((link) => axios.get(link))
            .then((payload) => {
                return payload.data;
            }).then((types) => {
                dispatch(getShippingTypeSuccess(types));
            }).catch((error) => {
                dispatch(getShippingTypeFailure(error.response));
            });
    }

}
