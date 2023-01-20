import axios, { AxiosError } from "axios";

import { FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE } from "./actionTypes";
import { Tag, DispatchTagsType, FetchTagsRequest, FetchTagsSuccessPayload, FetchTagsSuccess, FetchTagsFailurePayload, FetchTagsFailure } from "./types";

const getTags = async () => {
    return axios.get<Tag[]>("http://localhost:3001/tags");
}

export const fetchTags = () => async (dispatch: DispatchTagsType) => {
    try {
        dispatch(fetchTagsRequest());
        return getTags().then((tags) => {
            dispatch(fetchTagsSuccess({ tags: tags.data[0].data }));
        });
    } catch (err) {
        dispatch(fetchTagsFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchTagsRequest = (
): FetchTagsRequest => ({
    type: FETCH_TAGS_REQUEST
});

export const fetchTagsSuccess = (
    payload: FetchTagsSuccessPayload
): FetchTagsSuccess => ({
    type: FETCH_TAGS_SUCCESS,
    payload,
});

export const fetchTagsFailure = (
    payload: FetchTagsFailurePayload
): FetchTagsFailure => ({
    type: FETCH_TAGS_FAILURE,
    payload,
});