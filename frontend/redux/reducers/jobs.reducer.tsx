import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_FAIL,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
  SELECT_JOB_REQUEST,
  SELECT_JOB_SUCCESS,
  SELECT_JOB_FAIL,
  JobsReducerType,
  JobsActionType,
  JobsListAllActionType,
  CreateJobReducerType,
  CreateJobActionType,
  SelectJobReducerType,
  SelectJobActionType,
  JOBS_ALL_REQUEST,
  JOBS_ALL_SUCCESS,
  JOBS_ALL_FAIL,
} from '../types/jobs.types';

const initialState: JobsReducerType = {
  loading: false,
  jobs: [],
  error: false,
};

export const jobCreateReducer = (
  state: CreateJobReducerType = {},
  action: CreateJobActionType,
): CreateJobReducerType => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return {loading: true};
    case CREATE_JOB_SUCCESS:
      return {loading: false, jobCreated: action.payload};
    case CREATE_JOB_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const jobsSelectReducer = (
  state: SelectJobReducerType = {},
  action: SelectJobActionType,
): SelectJobReducerType => {
  switch (action.type) {
    case SELECT_JOB_REQUEST:
      return {loading: true};
    case SELECT_JOB_SUCCESS:
      return {loading: false, jobSelected: action.payload};
    case SELECT_JOB_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const jobsListReducer = (
  state: JobsReducerType = initialState,
  action: JobsActionType,
): JobsReducerType => {
  switch (action.type) {
    case JOBS_REQUEST:
      return {loading: true};
    case JOBS_SUCCESS:
      return {loading: false, jobs: action.payload};
    case JOBS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const jobsListAllReducer = (
  state: JobsReducerType = initialState,
  action: JobsListAllActionType,
): JobsReducerType => {
  switch (action.type) {
    case JOBS_ALL_REQUEST:
      return {loading: true};
    case JOBS_ALL_SUCCESS:
      return {loading: false, jobs: action.payload};
    case JOBS_ALL_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
