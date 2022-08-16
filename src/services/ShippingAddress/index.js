import { instance as axios } from "../../components/Layout/Helpers/api";
import {
    getShippingAddressStarted,
    getShippingAddressSuccess,
    getShippingAddressFailure,
    updateShippingAddressStarted,
    updateShippingAddressSuccess,
    updateShippingAddressFailure,
} from "../../actions/ShippingAddressActions";
import { parseTemplate } from 'url-template';

export const getAddress = (customer, addressTypeCode) => {
    return (dispatch) => {
        dispatch(getShippingAddressStarted());
        const { href } = customer._links.address;
        const link = parseTemplate(href).expand({
            "addressTypeCode": addressTypeCode,
        })
        return axios.get(link)
            .then((payload) => {
                return payload.data;
            }).then((address) => {
                dispatch(getShippingAddressSuccess(address));
            }).catch((error) => {
                dispatch(getShippingAddressFailure(error.response));
            });
    }
}


export const updateAddress = (address, payload) => {
    return (dispatch) => {
        dispatch(updateShippingAddressStarted());
        const { href } = address._links.updateAddress;
        return axios.post(href,
            payload)
            .then((payload) => {
                return payload.data;
            }).then((address) => {
                dispatch(updateShippingAddressSuccess(address));
            }).catch((error) => {
                dispatch(updateShippingAddressFailure(error.response));
            });
    }
}