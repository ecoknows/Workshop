import {
  SINGLE_WORKER_FAIL,
  SINGLE_WORKER_REQUEST,
  SINGLE_WORKER_SUCCESS,
  WorkersActionType,
  WorkersReducerType,
  WORKER_FAIL,
  WORKER_REQUEST,
  WORKER_SUCCESS,
} from '../types/worker.types';

const initialState: WorkersReducerType = {
  loading: false,
  data: null,
  error: false,
};

export const workersReducerType = (
  state: WorkersReducerType = initialState,
  action: WorkersActionType,
): WorkersReducerType => {
  switch (action.type) {
    case WORKER_REQUEST:
      return {loading: true};
    case WORKER_SUCCESS:
      return {loading: false, data: action.payload};
    case WORKER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const singleWorkersReducerType = (
  state: WorkersReducerType = initialState,
  action: WorkersActionType,
): WorkersReducerType => {
  switch (action.type) {
    case SINGLE_WORKER_REQUEST:
      return {loading: true};
    case SINGLE_WORKER_SUCCESS:
      return {loading: false, data: action.payload};
    case SINGLE_WORKER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
