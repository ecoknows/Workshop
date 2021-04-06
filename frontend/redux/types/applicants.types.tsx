import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface ApplicantsInterface {
  _id?: string;

  job_id: string;
  person_of_contact_id: string;
  applicant_id: string;

  person_of_contact: string;
  applicant_name: string;
  documentation_links?: {name: string; path: string; file_name: string}[];
}

export const APPLICANTS_REQUEST = 'APPLICANTS_REQUEST';
export const APPLICANTS_SUCCESS = 'APPLICANTS_SUCCESS';
export const APPLICANTS_FAIL = 'APPLICANTS_FAIL';

export const SELECTED_APPLICANTS_REQUEST = 'SELECTED_APPLICANTS_REQUEST';
export const SELECTED_APPLICANTS_SUCCESS = 'SELECTED_APPLICANTS_SUCCESS';
export const SELECTED_APPLICANTS_FAIL = 'SELECTED_APPLICANTS_FAIL';

interface ApplicantsSuccessType extends DefaultPropertiesInterface {
  data?: ApplicantsInterface | null | object;
}

export type ApplicantsReducerType = ApplicantsSuccessType;
export type ApplicantsActionType =
  | RequestInterface<typeof APPLICANTS_REQUEST>
  | RequestInterface<typeof SELECTED_APPLICANTS_REQUEST>
  | SuccessAndFailInterface<
      typeof APPLICANTS_SUCCESS | typeof APPLICANTS_FAIL,
      ApplicantsInterface
    >
  | SuccessAndFailInterface<
      typeof SELECTED_APPLICANTS_SUCCESS | typeof SELECTED_APPLICANTS_FAIL,
      ApplicantsInterface
    >;
