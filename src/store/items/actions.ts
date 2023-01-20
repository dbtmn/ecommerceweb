import axios, { AxiosError } from "axios";
import { NUMBER_OF_PRODUCT_PER_PAGE } from "../../constants";
import { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, FETCH_ITEMS_BY_FILTER_REQUEST } from "./actionTypes";
import { Item, FetchItemsRequest, FetchItemsByFilterRequest, FetchItemsSuccessPayload, FetchItemsSuccess, FetchItemsFailurePayload, FetchItemsFailure } from "./types";
import { FilterState, SortType, OrderType } from "../filters/types";
import { store } from "../../index";

const getItems = () =>
    axios.get<Item[]>(`http://localhost:3001/items?_page=1&_limit=16&_sort=price&_order=asc`);

const getItemsByFilter = (activePage: number, sortType: SortType, orderType: OrderType, companies: string, tags: string, itemType: string) => {
    return axios.get<Item[]>(`http://localhost:3001/items?_page=${activePage}&_limit=${NUMBER_OF_PRODUCT_PER_PAGE}&_sort=${sortType}&_order=${orderType || 'asc'}${companies || ''}${tags || ''}${itemType || ''}`).then(result => result);
}

// dispatch: DispatchItemsType | DispatchFiltersType
export const fetchItems = () => async (dispatch: any) => {
    try {
        dispatch(fetchItemsRequest());
        return getItems().then((items: any) => {
            let totalCount = items.headers.get("X-Total-Count");
            dispatch(fetchItemsSuccess({ items: items.data }));
            const totalPage = Math.ceil(totalCount / NUMBER_OF_PRODUCT_PER_PAGE);
            dispatch({
                type: "SET_TOTAL_PAGE",
                totalPage
            });
        });
    } catch (err) {
        dispatch(fetchItemsFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
}

// dispatch: DispatchItemsType | DispatchFiltersType
export const fetchItemsByFilter = () => async (dispatch: any) => {
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
        return getItemsByFilter(filters.activePage, filters.sortType, filters.orderType, brandsQueryParams, tagsQueryParams, itemTypeQueryParam).then((items: any) => {
            let totalCount = items.headers.get("X-Total-Count");;
            dispatch(fetchItemsSuccess({ items: items.data }));
            const totalPage = Math.ceil(totalCount / NUMBER_OF_PRODUCT_PER_PAGE);
            dispatch({
                type: "SET_TOTAL_PAGE",
                totalPage
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