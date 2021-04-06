import Axios from 'axios';

import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_FAIL,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
  SELECT_JOB_SUCCESS,
  JOBS_ALL_REQUEST,
  JOBS_ALL_SUCCESS,
  JOBS_ALL_FAIL,
} from '../types/jobs.types';

export const all_jobs = () => async (dispatch: any, getState: any) => {
  dispatch({type: JOBS_ALL_REQUEST});
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.get(`/jobs/list?all=${true}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      dispatch({type: JOBS_ALL_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: JOBS_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const get_jobs = () => async (dispatch: any, getState: any) => {
  dispatch({type: JOBS_REQUEST});
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.get(`/jobs/list?employer_id=${userData._id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    dispatch({type: JOBS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: JOBS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const add_selected_job = job => async (dispatch: any, getState: any) => {
  dispatch({type: SELECT_JOB_SUCCESS, payload: job});
};

export const add_job = job => async (dispatch: any, getState: any) => {
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.post('/jobs/add', {
      employer_id: userData._id,
      employer_full_name: userData.full_name,
      employer_profile: userData.profile_pic,
      ...job,
    });
    if (data) {
      dispatch({type: CREATE_JOB_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: CREATE_JOB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
