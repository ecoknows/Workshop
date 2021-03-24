import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface JobsInterface {
  _id: number;
  employer: string;
  job: string;

  current_workers: number;
  max_workers: number;


  current_applicants: number;

  description: string;
  icons: number;
}

export const JOBS_REQUEST = 'JOBS_REQUEST';
export const JOBS_SUCCESS = 'JOBS_SUCCESS';
export const JOBS_FAIL = 'JOBS_FAIL';


export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAIL = 'CREATE_JOB_FAIL';

export const SELECT_JOB_REQUEST = 'SELECT_JOB_REQUEST';
export const SELECT_JOB_SUCCESS = 'SELECT_JOB_SUCCESS';
export const SELECT_JOB_FAIL = 'SELECT_JOB_FAIL';

interface JobsSuccesTypes extends DefaultPropertiesInterface {
  jobs?: JobsInterface[] | null | [];
}

interface CreateJobSuccessTypes extends DefaultPropertiesInterface{
  jobCreated?: JobsInterface | null | {};
}


interface SelectJobSuccessTypes extends DefaultPropertiesInterface{
  jobSelected?: JobsInterface | null | {};
}

export type JobsReducerType = JobsSuccesTypes;
export type CreateJobReducerType = CreateJobSuccessTypes;
export type SelectJobReducerType = SelectJobSuccessTypes;

export type JobsActionType =
  | RequestInterface<typeof JOBS_REQUEST>
  | SuccessAndFailInterface<
      typeof JOBS_SUCCESS | typeof JOBS_FAIL,
      JobsInterface[]
    >;

export type CreateJobActionType = 
  | RequestInterface<typeof CREATE_JOB_REQUEST>
  | SuccessAndFailInterface<
      typeof CREATE_JOB_SUCCESS | typeof JOBS_FAIL,
      JobsInterface
    >

  
export type SelectJobActionType = 
| RequestInterface<typeof SELECT_JOB_REQUEST>
| SuccessAndFailInterface<
    typeof SELECT_JOB_SUCCESS | typeof SELECT_JOB_FAIL,
    JobsInterface
  >