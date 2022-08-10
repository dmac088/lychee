import { instance as axios } from "../../components/Layout/Helpers/api";
import { discover } from '../../actions/DiscoveryActions';
import { getAllCategories } from '../Category/index';

export const discoverAll = (locale, currency) =>
    axios.get(`/api/Discovery/${locale}/${currency}`);

export const initialize = (locale, currency) => {
    return (dispatch) => {
        return dispatch(discover(locale, currency))
            .then(() => {
                dispatch(getAllCategories());
            });
    }
}