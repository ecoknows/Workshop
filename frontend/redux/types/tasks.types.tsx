import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface TasksInterface {
  _id?: string;
  TASK_id: string;
  job_id: string;
  name: string;
  status: number;
}

export const TASK_REQUEST = 'TASK_REQUEST';
export const TASK_SUCCESS = 'TASK_SUCCESS';
export const TASK_FAIL = 'TASK_FAIL';

interface TasksSuccessType extends DefaultPropertiesInterface {
  data?: TasksInterface | null | object;
}

export type TasksReducerType = TasksSuccessType;
export type TasksActionType =
  | RequestInterface<typeof TASK_REQUEST>
  | SuccessAndFailInterface<
      typeof TASK_SUCCESS | typeof TASK_FAIL,
      TasksInterface
    >;
