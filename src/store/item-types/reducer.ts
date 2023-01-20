import {
    FETCH_ITEM_TYPES_REQUEST,
    FETCH_ITEM_TYPES_SUCCESS,
    FETCH_ITEM_TYPES_FAILURE,
  } from "./actionTypes";
  
  import { ItemTypesActions, ItemTypesState } from "./types";
  
  const initialState: ItemTypesState = {
    pending: false,
    itemTypes: [],
    error: null,
  };
  
  const itemTypesReducer = (state = initialState, action: ItemTypesActions) => {
    switch (action.type) {
      case FETCH_ITEM_TYPES_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_ITEM_TYPES_SUCCESS:
        return {
          ...state,
          pending: false,
          itemTypes: action.payload.itemTypes,
          error: null,
        };
      case FETCH_ITEM_TYPES_FAILURE:
        return {
          ...state,
          pending: false,
          itemTypes: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };

  export default itemTypesReducer;