import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE,
} from "./actionTypes";

export interface Tag {
    data: string[];
}

export interface TagsState {
    pending: boolean;
    tags: string[];
    error: string | null;
}

export interface FetchTagsSuccessPayload {
    tags: string[];
}

export interface FetchTagsFailurePayload {
    error: string;
}

export interface FetchTagsRequest {
    type: typeof FETCH_TAGS_REQUEST;
}

export type FetchTagsSuccess = {
    type: typeof FETCH_TAGS_SUCCESS;
    payload: FetchTagsSuccessPayload;
};

export type FetchTagsFailure = {
    type: typeof FETCH_TAGS_FAILURE;
    payload: FetchTagsFailurePayload;
};

export type DispatchTagsType = (args?: TagsActions) => void;

export type TagsActions =
    | FetchTagsRequest
    | FetchTagsSuccess
    | FetchTagsFailure;