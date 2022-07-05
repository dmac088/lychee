import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import categoryReducer from "./categoryReducer";
import discoveryReducer from "./discoveryReducer";
import sessionReducer from "./sessionReducer";
import customerReducer from "./customerReducer";
import bagReducer from "./bagReducer";
import bagContentsReducer from "./bagContentsReducer";
import billingAddressReducer from "./billingAddressReducer";
import shippingAddressReducer from "./shippingAddressReducer";
import shippingProviderReducer from "./shippingProviderReducer";
import shippingDestinationReducer from "./shippingDestinationReducer";
import shippingTypeReducer from "./shippingTypeReducer";
import shippingProductReducer from "./shippingProductReducer";

export default combineReducers({
  categories: categoriesReducer,
  category: categoryReducer,
  discovery: discoveryReducer,
  session: sessionReducer,
  customer: customerReducer,
  bag: bagReducer,
  bagContents: bagContentsReducer,
  billingAddress: billingAddressReducer,
  shippingAddress: shippingAddressReducer,
  shippingProviders: shippingProviderReducer,
  shippingDestinations: shippingDestinationReducer,
  shippingTypes: shippingTypeReducer,
  shippingProduct: shippingProductReducer,
});
