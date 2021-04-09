import {
  TasksActionType,
  TasksReducerType,
  TASK_FAIL,
  TASK_REQUEST,
  TASK_SUCCESS,
} from '../types/tasks.types';

const initialState: TasksReducerType = {
  loading: false,
  data: null,
  error: false,
};

export const tasksReducerType = (
  state: TasksReducerType = initialState,
  action: TasksActionType,
): TasksReducerType => {
  switch (action.type) {
    case TASK_REQUEST:
      return {loading: true};
    case TASK_SUCCESS:
      return {loading: false, data: action.payload};
    case TASK_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
