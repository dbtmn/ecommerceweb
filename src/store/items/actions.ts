import axios, { AxiosError } from "axios";
import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, FETCH_ITEMS_BY_FILTER_REQUEST } from "./actionTypes";
import { Item, FetchItemsRequest, FetchItemsByFilterRequest, FetchItemsSuccessPayload, FetchItemsSuccess, FetchItemsFailurePayload, FetchItemsFailure } from "./types";
import { FilterState } from "../filters/types";
import { store } from "../../index";

export const getItems = () =>
    axios.get<Item[]>("http://localhost:3001/items");

const getItemsByFilter = (activePage: number, sortType: string, orderType: string, companies: string, tags: string, itemType: string) => {
    return axios.get<Item[]>(`http://localhost:3001/items?_page=${activePage}&_limit=16&_sort=${sortType}&_order=${orderType || 'asc'}${companies || ''}${tags || ''}${itemType || ''}`).then(result => result);
}

export const fetchItems = () => async (/* dispatch: DispatchItemsType, dispatchFilter: DispatchFiltersType */ dispatch: any) => {
    try {
        dispatch(fetchItemsRequest());
        return getItems().then((items: any) => {
            dispatch(fetchItemsSuccess({ items: items.data }))
            const totalPageCount = Math.ceil(items.data.length / 16 /* NUMBER_OF_PRODUCT_PER_PAGE */);
            dispatch({
                type: "SET_TOTAL_PAGE",
                totalPage: totalPageCount
            });
            // dispatch(fetchItemsFailure({ error: "(err as AxiosError).message" }));

        });
    } catch (err) {
        dispatch(fetchItemsFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
}

export const fetchItemsByFilter = () => async (/* dispatch: DispatchItemsType, dispatchFilter: DispatchFiltersType */ dispatch: any) => {
    try {
        const filters: FilterState = store.getState().filters;
        let brandsQueryParams = "";
        let tagsQueryParams = "";
        let brandConcatField = "&manufacturer=";
        let tagConcatField = "&tags=";
        filters.brand.map(brandItem => {
            return brandsQueryParams = brandsQueryParams.concat(`${brandConcatField}${brandItem}`);
        });
        filters.tag.map(tagItem => {
            return tagsQueryParams = tagsQueryParams.concat(`${tagConcatField}${tagItem}`);
        });
        const itemTypeQueryParam = filters.itemType.length > 0 ? `&itemType=${filters.itemType}` : '';
        dispatch(fetchItemsRequest());

        return getItemsByFilter(filters.activePage, filters.sortType, filters.orderType, brandsQueryParams, tagsQueryParams, itemTypeQueryParam).then((items) => {
            dispatch(fetchItemsSuccess({ items: items.data }));
            const totalPageCount = Math.ceil(items.data.length / 16 /* NUMBER_OF_PRODUCT_PER_PAGE */);
            dispatch({
                type: "SET_TOTAL_PAGE",
                totalPage: totalPageCount
            })
        })

    } catch (err) {
        dispatch(fetchItemsFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
}

export const fetchItemsRequest = (
): FetchItemsRequest => ({
    type: FETCH_ITEMS_REQUEST
});

export const fetchItemsByFilterRequest = (
): FetchItemsByFilterRequest => ({
    type: FETCH_ITEMS_BY_FILTER_REQUEST
});

export const fetchItemsSuccess = (
    payload: FetchItemsSuccessPayload
): FetchItemsSuccess => ({
    type: FETCH_ITEMS_SUCCESS,
    payload,
});

export const fetchItemsFailure = (
    payload: FetchItemsFailurePayload
): FetchItemsFailure => ({
    type: FETCH_ITEMS_FAILURE,
    payload,
});