import { combineReducers } from "redux";

import companiesReducer from "./companies/reducer";
import itemTypesReducer from "./item-types/reducer";
import itemsReducer from "./items/reducer";
import filtersReducer from "./filters/reducer";
import shoppingBasketReducer from "./shopping-basket/reducer";
import tagsReducer from "./tags/reducer";

const rootReducer = combineReducers({
  companies: companiesReducer,
  itemTypes: itemTypesReducer,
  items: itemsReducer,
  filters: filtersReducer,
  shoppingBasket: shoppingBasketReducer,
  tags: tagsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;