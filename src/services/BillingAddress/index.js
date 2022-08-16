import { instance as axios } from "../../components/Layout/Helpers/api";
import {
    getBillingAddressStarted,
    getBillingAddressSuccess,
    getBillingAddressFailure,
    updateBillingAddressStarted,
    updateBillingAddressSuccess,
    updateBillingAddressFailure,
} from "../../actions/BillingAddressActions";
import { parseTemplate } from "url-template";

export const getAddress = (customer, addressTypeCode) => {
    return (dispatch) => {
        dispatch(getBillingAddressStarted());
        const { href } = customer._links.address;
        const link = parseTemplate(href).expand({
            "addressTypeCode": addressTypeCode
        })
        return axios.get(link)
            .then((payload) => {
                return payload.data;
            }).then((address) => {
                dispatch(getBillingAddressSuccess(address));
            }).catch((error) => {
                dispatch(getBillingAddressFailure(error.response));
            });
    }
}


export const updateAddress = (address, payload) => {
    return (dispatch) => {
        dispatch(updateBillingAddressStarted());
        return axios.post(address._links.updateAddress.href,
            payload)
            .then((payload) => {
                return payload.data;
            }).then((address) => {
                dispatch(updateBillingAddressSuccess(address));
            }).catch((error) => {
                dispatch(updateBillingAddressFailure(error.response));
            });
    }
}