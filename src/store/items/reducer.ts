import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,
    FETCH_ITEMS_BY_FILTER_REQUEST
} from "./actionTypes";

import { ItemsActions, ItemState } from "./types";

const initialState: ItemState = {
    pending: false,
    items: [],
    error: null,
};

const itemsReducer = (state = initialState, action: ItemsActions) => {
    switch (action.type) {
        case FETCH_ITEMS_REQUEST:
        case FETCH_ITEMS_BY_FILTER_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                pending: false,
                items: action.payload.items,
                error: null,
            };
        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                pending: false,
                items: [],
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export default itemsReducer;