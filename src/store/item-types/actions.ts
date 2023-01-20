import axios, { AxiosError } from "axios";

import { FETCH_ITEM_TYPES_REQUEST, FETCH_ITEM_TYPES_SUCCESS, FETCH_ITEM_TYPES_FAILURE } from "./actionTypes";
import { ItemType, DispatchItemTypesType, FetchItemTypesRequest, FetchItemTypesSuccessPayload, FetchItemTypesSuccess, FetchItemTypesFailurePayload, FetchItemTypesFailure } from "./types";

const getItemTypes = async () => {
    return axios.get<ItemType[]>("http://localhost:3001/itemTypes");
}

export const fetchItemTypes = () => async (dispatch: DispatchItemTypesType) => {
    try {
        dispatch(fetchItemTypesRequest());
        return getItemTypes().then((itemTypes) => {
            dispatch(fetchItemTypesSuccess({ itemTypes: itemTypes.data[0].data }));
        });
    } catch (err) {
        dispatch(fetchItemTypesFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchItemTypesRequest = (
): FetchItemTypesRequest => ({
    type: FETCH_ITEM_TYPES_REQUEST
});

export const fetchItemTypesSuccess = (
    payload: FetchItemTypesSuccessPayload
): FetchItemTypesSuccess => ({
    type: FETCH_ITEM_TYPES_SUCCESS,
    payload,
});

export const fetchItemTypesFailure = (
    payload: FetchItemTypesFailurePayload
): FetchItemTypesFailure => ({
    type: FETCH_ITEM_TYPES_FAILURE,
    payload,
});