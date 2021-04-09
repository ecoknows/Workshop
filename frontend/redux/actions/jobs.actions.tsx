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

import Toast from 'react-native-toast-message';
import {closeBottomDrawerAction} from './navigation.actions';

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

export const job_new_worker = (job_id: string) => async (dispatch: any) => {
  try {
    const {data} = await Axios.get(`/jobs/${job_id}/new_worker`);
    if (data) {
      dispatch(get_jobs());
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

export const add_job = (job: any) => async (dispatch: any, getState: any) => {
  const {
    userDetails: {userData},
  } = getState();
  console.log(job);

  if (
    job.icons == -1 ||
    job.job == '' ||
    job.description == '' ||
    job.max_workers == 0
  ) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Please fill all neccessary information ',
      text2: 'Try again 🥺',
      visibilityTime: 2000,
      autoHide: true,
    });
    return;
  }

  try {
    const {data} = await Axios.post('/jobs/add', {
      employer_id: userData._id,
      employer_full_name: userData.full_name,
      employer_profile: userData.profile_pic,
      employer_position: userData.position,
      ...job,
    });
    if (data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Job Created!',
        text2: 'Goodluck for finding employees! 💖',
        visibilityTime: 2000,
        autoHide: true,
      });
      dispatch({type: CREATE_JOB_SUCCESS, payload: data});
      dispatch(closeBottomDrawerAction('Add Job'));
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
