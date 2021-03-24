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

  CreateJobReducerType,
  CreateJobActionType,

  SelectJobReducerType,
  SelectJobActionType,

} from '../types/jobs.types';

const initialState: JobsReducerType = {
  loading: false,
  // userData: localStorage.getItem('userInfo')? getUserData(localStorage.getItem('userInfo')): null,
  jobs: [],
  error: false,
};


export const jobCreateReducer = (
  state: CreateJobReducerType = {},
  action: CreateJobActionType
): CreateJobReducerType => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return { loading: true };
    case CREATE_JOB_SUCCESS:
      return { loading: false, jobCreated: action.payload};
    case CREATE_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const jobsSelectReducer = (
  state: SelectJobReducerType = {},
  action: SelectJobActionType
) : SelectJobReducerType => {
  switch (action.type) {
    case SELECT_JOB_REQUEST:
      return { loading: true };
    case SELECT_JOB_SUCCESS:
      return { loading: false, jobSelected: action.payload};
    case SELECT_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export const jobsListReducer = (
  state: JobsReducerType = initialState,
  action: JobsActionType
): JobsReducerType => {
  switch (action.type) {
    case JOBS_REQUEST:
      return { loading: true };
    case JOBS_SUCCESS:
      return { loading: false, jobs: action.payload };
    case JOBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
