import { instance as axios } from "../../components/Layout/Helpers/api";
import store from '../../store';
import {
  getCategoriesStarted,
  getCategoriesSuccess,
  getCategoriesFailure
} from "../../actions/CategoryActions";
import { parseTemplate } from 'url-template';
import { localisation } from '../../services/api';

export const findByCode = (code) => {
  return store.getState().categories.list.filter(o => o.data.id === code)[0];
}

export const findRootNode = (categories) => {
  if (!categories) { return; }
  if (categories.length <= 0) { return; }
  const min = categories.reduce(function (prev, current) {
    return (prev.level > current.level) ? current : prev
  })
  return min;
}

export const getAllCategories = (def = localisation) => {
  return (dispatch, getState) => {
    dispatch(getCategoriesStarted());
    return axios.get(getState().discovery.links.categoryResource.href)
      .then((response) => {
        const { href } = response.data._links.categories;
        return parseTemplate(href).expand({
          ...def
        })
      })
      .then((link) => axios.get(link))
      .then((payload) => {
        return payload.data._embedded.objects;
      }).then((categories) => {
        dispatch(getCategoriesSuccess(categories));
      }).catch((error) => {
        dispatch(getCategoriesFailure(error.response));
      });

  }
}

export const getChildCategories = (parent = {}, categories = [], children = []) => {
  const c = categories.filter(o => o.data.parentId === parent.data.id);
  if (c.length === 0) {
    return children;
  }
  c.map((child) => {
    children.push(child);
    getChildCategories(child, categories, children);
  });
  return c;
}