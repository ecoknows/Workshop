import {
  ApplicantsActionType,
  ApplicantsReducerType,
  APPLICANTS_FAIL,
  APPLICANTS_REQUEST,
  APPLICANTS_SUCCESS,
  SELECTED_APPLICANTS_FAIL,
  SELECTED_APPLICANTS_REQUEST,
  SELECTED_APPLICANTS_SUCCESS,
} from '../types/applicants.types';

const initialState: ApplicantsReducerType = {
  loading: false,
  data: null,
  error: false,
};

export const applicantsReducerType = (
  state: ApplicantsReducerType = initialState,
  action: ApplicantsActionType,
): ApplicantsReducerType => {
  switch (action.type) {
    case APPLICANTS_REQUEST:
      return {loading: true};
    case APPLICANTS_SUCCESS:
      return {loading: false, data: action.payload};
    case APPLICANTS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const selectedApplicantReducerType = (
  state: ApplicantsReducerType = initialState,
  action: ApplicantsActionType,
): ApplicantsReducerType => {
  switch (action.type) {
    case SELECTED_APPLICANTS_REQUEST:
      return {loading: true};
    case SELECTED_APPLICANTS_SUCCESS:
      return {loading: false, data: action.payload};
    case SELECTED_APPLICANTS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
