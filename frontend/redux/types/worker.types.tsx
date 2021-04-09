import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface WorkersInterface {
  _id?: string;

  job_id: string;
  person_of_contact_id: string;
  worker_id: string;

  person_of_contact: string;
  worker_name: string;
  worker_name_profile?: string;
  documentation_links?: {name: string; path: string; file_name: string}[];
  progress?: number;
}

export const WORKER_REQUEST = 'WORKER_REQUEST';
export const WORKER_SUCCESS = 'WORKER_SUCCESS';
export const WORKER_FAIL = 'WORKER_FAIL';

export const SINGLE_WORKER_REQUEST = 'SINGLE_WORKER_REQUEST';
export const SINGLE_WORKER_SUCCESS = 'SINGLE_WORKER_SUCCESS';
export const SINGLE_WORKER_FAIL = 'SINGLE_WORKER_FAIL';

interface WorkersSuccessType extends DefaultPropertiesInterface {
  data?: WorkersInterface | null | object;
}

export type WorkersReducerType = WorkersSuccessType;
export type WorkersActionType =
  | RequestInterface<typeof WORKER_REQUEST>
  | RequestInterface<typeof SINGLE_WORKER_REQUEST>
  | SuccessAndFailInterface<
      typeof WORKER_SUCCESS | typeof WORKER_FAIL,
      WorkersInterface
    >
  | SuccessAndFailInterface<
      typeof SINGLE_WORKER_SUCCESS | typeof SINGLE_WORKER_FAIL,
      WorkersInterface
    >;
