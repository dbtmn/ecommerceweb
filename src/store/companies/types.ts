import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,
} from "./actionTypes";

export interface Company {
    slug: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    account: string;
    contact: string;
}

export interface CompanyState {
    pending: boolean;
    companies: Company[];
    error: string | null;
}
  
export interface FetchCompaniesSuccessPayload {
    companies: Company[];
}

export interface FetchCompaniesFailurePayload {
    error: string;
}

export interface FetchCompaniesRequest {
    type: typeof FETCH_COMPANIES_REQUEST;
}

export type FetchCompaniesSuccess = {
    type: typeof FETCH_COMPANIES_SUCCESS;
    payload: FetchCompaniesSuccessPayload;
};

export type FetchCompaniesFailure = {
    type: typeof FETCH_COMPANIES_FAILURE;
    payload: FetchCompaniesFailurePayload;
};

export type DispatchCompaniesType = (args?: CompaniesActions) => void;

// export type CompaniesPayloads =
//     | FetchCompaniesSuccessPayload
//     | FetchCompaniesFailurePayload;

export type CompaniesActions =
  | FetchCompaniesRequest
  | FetchCompaniesSuccess
  | FetchCompaniesFailure;