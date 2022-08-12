import { instance as axios } from "../../components/Layout/Helpers/api";
import { discover } from '../../actions/DiscoveryActions';
import { getAllCategories } from '../Category/index';

export const getDiscoveryURIs = (locale, currency) =>
    axios.post('/api/discover', {"locale": locale, 
                                 "currency": currency});

export const initialize = (locale, currency) => {
    return (dispatch) => {
        return dispatch(discover(locale, currency))
            .then(() => {
                dispatch(getAllCategories());
            });
    }
}