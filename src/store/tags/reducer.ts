import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE,
  } from "./actionTypes";
  
  import { TagsActions, TagsState } from "./types";
  
  const initialState: TagsState = {
    pending: false,
    tags: [],
    error: null,
  };
  
  const tagsReducer = (state = initialState, action: TagsActions) => {
    switch (action.type) {
      case FETCH_TAGS_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_TAGS_SUCCESS:
        return {
          ...state,
          pending: false,
          tags: action.payload.tags,
          error: null,
        };
      case FETCH_TAGS_FAILURE:
        return {
          ...state,
          pending: false,
          tags: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };

  export default tagsReducer;