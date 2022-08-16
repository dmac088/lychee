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
        const { href } = getState().bag._links.getShippingTypes;
        console.log(href);
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency,
            "destination": destinationCode,
        });
        return axios.get(link)
        .then((payload) => {
            return payload.data;
        }).then((types) => {
            dispatch(getShippingTypeSuccess(types));
        }).catch((error) => {
            dispatch(getShippingTypeFailure(error.response));
        });
     }
}
