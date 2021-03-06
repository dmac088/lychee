import { instance as axios } from "../../components/Layout/Helpers/api";
import { discover } from '../../actions/DiscoveryActions';
import { getAllCategories } from '../Category/index';

export const discoverAll = () =>
    axios.get(`/api/Discovery`);

export const initialize = () => {
    return (dispatch) => {
        return dispatch(discover())
            .then(() => {
                dispatch(getAllCategories());
            });
    }
}