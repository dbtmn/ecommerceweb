import {
    FETCH_ITEM_TYPES_REQUEST,
    FETCH_ITEM_TYPES_SUCCESS,
    FETCH_ITEM_TYPES_FAILURE,
} from "./actionTypes";

export interface ItemType {
    data: string[];
}

export interface ItemTypesState {
    pending: boolean;
    itemTypes: string[];
    error: string | null;
}

export interface FetchItemTypesSuccessPayload {
    itemTypes: string[];
}

export interface FetchItemTypesFailurePayload {
    error: string;
}

export interface FetchItemTypesRequest {
    type: typeof FETCH_ITEM_TYPES_REQUEST;
}

export type FetchItemTypesSuccess = {
    type: typeof FETCH_ITEM_TYPES_SUCCESS;
    payload: FetchItemTypesSuccessPayload;
};

export type FetchItemTypesFailure = {
    type: typeof FETCH_ITEM_TYPES_FAILURE;
    payload: FetchItemTypesFailurePayload;
};

export type DispatchItemTypesType = (args?: ItemTypesActions) => void;

export type ItemTypesActions =
    | FetchItemTypesRequest
    | FetchItemTypesSuccess
    | FetchItemTypesFailure;