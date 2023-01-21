import {
  SET_ORDER,
  SET_BRAND,
  SET_ITEM_TYPE,
  SET_ACTIVE_PAGE,
  SET_TOTAL_PAGE,
  SET_TAG,
  CLEAR_BRAND,
  CLEAR_TAG,
  DELETE_BRAND,
  DELETE_TAG
} from "./actionTypes";

import { SortType, OrderType, FilterActions, FilterState } from "./types";

const initialState: FilterState = {
  sortType: SortType.price,
  orderType: OrderType.asc,
  itemType: '',
  brand: [],
  activePage: 1,
  totalPage: 1,
  tag: [],
};

const filtersReducer = (state = initialState, action: FilterActions) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        sortType: action.sortType,
        orderType: action.orderType,
      };
    case SET_BRAND:
      return {
        ...state,
        brand: [...state.brand, action.brand],
      };
    case SET_ITEM_TYPE:
      return {
        ...state,
        itemType: action.itemType
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.activePage
      };
    case SET_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.totalPage
      };
    case SET_TAG:
      return {
        ...state,
        tag: [...state.tag, action.tag],
      };
    case CLEAR_BRAND:
      return {
        ...state,
        brand: []
      };
    case CLEAR_TAG:
      return {
        ...state,
        tag: []
      };
    case DELETE_BRAND:
      const indexBrand = state.brand.indexOf(action.brand);
      state.brand.splice(indexBrand, 1);
      return {
        ...state,
      };
    case DELETE_TAG:
      const indexTag = state.tag.indexOf(action.tag);
      state.tag.splice(indexTag, 1);
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default filtersReducer;