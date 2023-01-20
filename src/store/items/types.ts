import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    FETCH_ITEMS_BY_FILTER_REQUEST
  } from "./actionTypes";
  
  export interface Item {
    tags: string[];
    price: number;
    name: string;
    description: string;
    slug: string;
    added: number;
    manufacturer: string;
    itemType: string;
  }
  
  export interface ItemState {
    pending: boolean;
    items: Item[];
    error: string | null;
  }
  
  export interface FetchItemsSuccessPayload {
    items: Item[];
  }
  
  export interface FetchItemsFailurePayload {
    error: string;
  }
  
  export interface FetchItemsRequest {
    type: typeof FETCH_ITEMS_REQUEST;
  }
  
  export interface FetchItemsByFilterRequest {
    type: typeof FETCH_ITEMS_BY_FILTER_REQUEST;
  }
  
  export type FetchItemsSuccess = {
    type: typeof FETCH_ITEMS_SUCCESS;
    payload: FetchItemsSuccessPayload;
  };
  
  export type FetchItemsFailure = {
    type: typeof FETCH_ITEMS_FAILURE;
    payload: FetchItemsFailurePayload;
  };
  
  export type DispatchItemsType = (args?: ItemsActions) => void;

  export type ItemsActions =
    | FetchItemsRequest
    | FetchItemsSuccess
    | FetchItemsFailure
    | FetchItemsByFilterRequest;