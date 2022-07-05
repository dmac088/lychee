import { instance as axios } from "../../../components/Layout/Helpers/api";
import {
    getShippingTypeStarted,
    getShippingTypeSuccess,
    getShippingTypeFailure,
} from "../../../actions/ShippingTypeActions";

//we inject the selected destination to get the relevant types
export const getShippingType = (destination) => {  
     return (dispatch) => {
         dispatch(getShippingTypeStarted());
        return axios.get(destination._links.shippingTypes.href)
        .then((payload) => {
            return payload.data;
        }).then((types) => {
            dispatch(getShippingTypeSuccess(types));
        }).catch((error) => {
            dispatch(getShippingTypeFailure(error.response));
        });
     }
}
