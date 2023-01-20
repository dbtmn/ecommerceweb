import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,
  } from "./actionTypes";
  
  import { CompaniesActions, CompanyState } from "./types";
  
  const initialState: CompanyState = {
    pending: false,
    companies: [],
    error: null,
  };
  
  const companiesReducer = (state = initialState, action: CompaniesActions) => {
    switch (action.type) {
      case FETCH_COMPANIES_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_COMPANIES_SUCCESS:
        return {
          ...state,
          pending: false,
          companies: action.payload.companies,
          error: null,
        };
      case FETCH_COMPANIES_FAILURE:
        return {
          ...state,
          pending: false,
          companies: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };

  export default companiesReducer;