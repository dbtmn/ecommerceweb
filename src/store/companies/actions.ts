import axios, { AxiosError } from "axios";

import { FETCH_COMPANIES_REQUEST, FETCH_COMPANIES_SUCCESS, FETCH_COMPANIES_FAILURE } from "./actionTypes";
import { DispatchCompaniesType, Company, FetchCompaniesRequest, FetchCompaniesSuccessPayload, FetchCompaniesSuccess, FetchCompaniesFailurePayload, FetchCompaniesFailure } from "./types";

const getCompanies = async () => {
    return axios.get<Company[]>("http://localhost:3001/companies");
}

export const fetchCompanies = () => async (/*dispatch: any*/ dispatch: DispatchCompaniesType) => {
    try {
        dispatch(fetchCompaniesRequest());
        return getCompanies().then((companies) => {
            dispatch(fetchCompaniesSuccess({ companies: companies.data }));
            // dispatch(fetchCompaniesFailure({ error: "(err as AxiosError).message" }));

        });
    } catch (err) {
        dispatch(fetchCompaniesFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchCompaniesRequest = (
): FetchCompaniesRequest => ({
    type: FETCH_COMPANIES_REQUEST
});

export const fetchCompaniesSuccess = (
    payload: FetchCompaniesSuccessPayload
): FetchCompaniesSuccess => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload,
});

export const fetchCompaniesFailure = (
    payload: FetchCompaniesFailurePayload
): FetchCompaniesFailure => ({
    type: FETCH_COMPANIES_FAILURE,
    payload,
});