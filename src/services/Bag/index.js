import { instance as axios } from "../../components/Layout/Helpers/api";
import { history } from '../../components/Layout/Helpers/route';
import { getAccountPath } from "../../components/Layout/Helpers/route";
import { matchPath } from 'react-router';
import store from '../../store';
import { parseTemplate } from 'url-template';
import { localisation } from "../api";
import {
    getBagStarted,
    getBagSuccess,
    getBagFailure,
    emptyBag
} from '../../actions/BagActions';
import {
    emptyBagContents,
    getBagContentsStarted,
    getBagContentsSuccess,
    getBagContentsFailure,
    addBagItemStarted,
    addBagItemSuccess,
    addBagItemFailure,
    removeBagItemStarted,
    removeBagItemSuccess,
    removeBagItemFailure,
    updateBagItemStarted,
    updateBagItemSuccess,
    updateBagItemFailure,
    addShippingStarted,
    addShippingSuccess,
    addShippingFailure,
} from '../../actions/BagContentsActions';


export const isAuthenticated = () => {
    const authenticated = store.getState().session.authenticated;

    if (!authenticated) {
        const match = matchPath(history.location.pathname, {
            path: "/:lang/:curr",
            exact: false,
            strict: true
        });
        history.push(getAccountPath(match));
    }
    return authenticated;
}

export const addItem = (productCode, quantity = 1, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(addBagItemStarted());
        const { href } = getState().bag._links.addItem;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency
        })
        return axios.post(link, {
            "itemUPC": productCode,
            "itemQty": quantity,
        })
            .then(() => {
                dispatch(addBagItemSuccess());
            })
            .catch(() => {
                dispatch(addBagItemFailure());
            });
    }
}


export const addShipping = (productCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(addShippingStarted());
        const { href } = getState().bag._links.addShipping;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency
        })
        return axios.post(link, {
            "shippingProductCode": productCode
        })
            .then((response) => {
               // console.log(response.data);
                dispatch(addShippingSuccess());
            })
            .catch(() => {
                dispatch(addShippingFailure());
            });
    }
}


export const removeItem = (itemCode, locale, currency) => {
    return (dispatch, getState) => {
        dispatch(removeBagItemStarted());
        const { href } = getState().bag._links.removeItem;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency,
            "itemCode": itemCode
        })
        return axios.get(link)
            .then(() => {
                dispatch(removeBagItemSuccess());
            })
            .catch(() => {
                dispatch(removeBagItemFailure());
            });
    }
}

export const updateItem = (item) => {
    return (dispatch, getState) => {
        dispatch(updateBagItemStarted());
        return axios.post(getState().bag._links.updateItem.href, item)
            .then(() => {
                dispatch(updateBagItemSuccess());
            })
            .catch(() => {
                dispatch(updateBagItemFailure());
            });
    }
}

export const getBag = (locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getBagStarted());
        const { href } = getState().discovery.links.customerResource;
        return axios.get(href)
            .then((response) => {
                return axios.get(parseTemplate(response.data._links.bag.href).expand({
                    ...localisation,
                    "locale": locale,
                    "currency": currency,
                }))
            })
            .then((payload) => {
                return payload.data;
            }).then((response) => {
                dispatch(getBagSuccess(response));
            }).catch((error) => {
                dispatch(getBagFailure(error.response));
            });
    }
}

export const clearBag = () => {
    return (dispatch) => {
        dispatch(emptyBag())
        dispatch(emptyBagContents());
    }
}

//we need to inject the dependencies into the function
export const getBagContents = (locale, currency) => {
    return (dispatch, getState) => {
        dispatch(getBagContentsStarted());
        const { href } = getState().bag._links.bagContents;
        const link = parseTemplate(href).expand({
            ...localisation,
            "locale": locale,
            "currency": currency,
        })
        return axios.get(link)
            .then((payload) => {
                return (payload.data._embedded)
                    ? payload.data._embedded.bagItemResources
                    : [];
            }).then((items) => {
                dispatch(getBagContentsSuccess(items));
            }).catch((error) => {
                dispatch(getBagContentsFailure(error.response));
            });
    }
}



