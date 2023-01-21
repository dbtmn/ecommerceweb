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

export enum SortType {
  added = "added",
  price = "price"
}

export enum OrderType {
  asc = "asc",
  desc = "desc"
}

export interface FilterState {
  sortType: SortType;
  orderType: OrderType;
  itemType: string;
  brand: string[];
  activePage: number;
  totalPage: number;
  tag: string[];
}

export interface SetOrder {
  type: typeof SET_ORDER;
  sortType: SortType;
  orderType: OrderType;
}

export interface SetBrand {
  type: typeof SET_BRAND;
  brand: string;
}

export interface SetItemType {
  type: typeof SET_ITEM_TYPE;
  itemType: string;
}

export interface SetActivePage {
  type: typeof SET_ACTIVE_PAGE;
  activePage: number;
}

export interface SetTotalPage {
  type: typeof SET_TOTAL_PAGE;
  totalPage: number;
}

export interface SetTag {
  type: typeof SET_TAG;
  tag: string;
}

export interface ClearBrand {
  type: typeof CLEAR_BRAND;
}

export interface ClearTag {
  type: typeof CLEAR_TAG;
}

export interface DeleteBrand {
  type: typeof DELETE_BRAND;
  brand: string;
}

export interface DeleteTag {
  type: typeof DELETE_TAG;
  tag: string;
}

export type DispatchFiltersType = (args?: FilterActions) => void;

export type FilterActions = SetOrder | SetBrand | SetItemType | SetActivePage | SetTotalPage | SetTag | ClearBrand | ClearTag | DeleteBrand | DeleteTag;