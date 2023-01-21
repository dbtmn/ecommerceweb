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
  DELETE_TAG,
} from "./actionTypes";
import {
  SortType,
  OrderType,
  SetOrder,
  SetBrand,
  SetItemType,
  SetActivePage,
  SetTotalPage,
  SetTag,
  ClearBrand,
  ClearTag,
  DeleteBrand,
  DeleteTag
} from "./types";

export const setOrder = (sortType: SortType, orderType: OrderType): SetOrder => ({
  type: SET_ORDER,
  sortType,
  orderType
});

export const setBrand = (brand: string): SetBrand => ({
  type: SET_BRAND,
  brand
});

export const setItemType = (itemType: string): SetItemType => ({
  type: SET_ITEM_TYPE,
  itemType
});

export const setActivePage = (activePage: number): SetActivePage => ({
  type: SET_ACTIVE_PAGE,
  activePage
});

export const setTotalPage = (totalPage: number): SetTotalPage => ({
  type: SET_TOTAL_PAGE,
  totalPage
});

export const setTag = (tag: string): SetTag => ({
  type: SET_TAG,
  tag
});

export const clearBrand = (): ClearBrand => ({
  type: CLEAR_BRAND
});

export const clearTag = (): ClearTag => ({
  type: CLEAR_TAG
});

export const deleteBrand = (brand: string): DeleteBrand => ({
  type: DELETE_BRAND,
  brand
});

export const deleteTag = (tag: string): DeleteTag => ({
  type: DELETE_TAG,
  tag
});
