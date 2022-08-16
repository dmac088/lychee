import { instance as axios } from "../../components/Layout/Helpers/api";
import { discover } from '../../actions/DiscoveryActions';
import { getAllCategories } from '../Category/index';

export const getDiscoveryURIs = (locale, currency) =>
    axios.get('/api/discover');

export const initialize = (locale, currency) => {
    return (dispatch) => {
        return dispatch(discover())
            .then(() => {
                dispatch(getAllCategories(locale, currency));
            });
    }
}

