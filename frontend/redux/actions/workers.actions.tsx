import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {notify_someone} from '../../constants/notification_request';
import {
  SINGLE_WORKER_FAIL,
  SINGLE_WORKER_REQUEST,
  SINGLE_WORKER_SUCCESS,
  WORKER_FAIL,
  WORKER_REQUEST,
  WORKER_SUCCESS,
} from '../types/worker.types';
import {get_applicant_contact_person} from './applicants.actions';
import {get_jobs, job_new_worker} from './jobs.actions';

export const update_progress = (
  applicant_id: string,
  progress: number,
) => async (dispatch: any, getState: any) => {
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.put(
      `/workers/${applicant_id}/progress`,
      {progress},
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Your progress has been update!',
        text2: 'Nice Job!',
        visibilityTime: 2000,
        autoHide: true,
      });
      dispatch(get_applicant_contact_person());
      dispatch({type: SINGLE_WORKER_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: SINGLE_WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const add_worker = (applicant_id: string, job_id: string) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.get(`/workers/${applicant_id}/add`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Wow you hired a new worker!',
        text2: 'Goodluck!',
        visibilityTime: 2000,
        autoHide: true,
      });
      dispatch(get_applicant_contact_person());
      dispatch(job_new_worker(job_id));
      dispatch({type: SINGLE_WORKER_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: SINGLE_WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fire_worker = (_id: string) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.delete(`/workers/fire/${_id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Worker Deleted!',
        text2: 'Hope he will find a new job!',
        visibilityTime: 2000,
        autoHide: true,
      });
      dispatch(get_workers_contact_person());
      dispatch(get_jobs());
    }
  } catch (error) {
    dispatch({
      type: SINGLE_WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resign_employer = (_id: string) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
  } = getState();
  try {
    const {data} = await Axios.delete(`/workers/fire/${_id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Successfully resign!',
        text2: 'Hope you will find a new job!',
        visibilityTime: 2000,
        autoHide: true,
      });
      console.log(data, 'deym san');

      notify_someone(userData, {
        sender_id: userData._id,
        sender_name: userData.full_name,
        sender_profile: userData.profile_pic,

        reciever_id: data.person_of_contact_id,

        description: 'Resignation Notice',
      });
      dispatch(get_workers_contact_person());
    }
  } catch (error) {
    dispatch({
      type: SINGLE_WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const get_workers_contact_person = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: WORKER_REQUEST});
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(
      `/workers/get?person_of_contact_id=${userData._id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: WORKER_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const get_employers_worker_id = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: WORKER_REQUEST});
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(`/workers/get?worker_id=${userData._id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      dispatch({type: WORKER_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: WORKER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const single_worker = (item: any) => (dispatch: any, getState: any) => {
  dispatch({type: SINGLE_WORKER_REQUEST});

  dispatch({type: SINGLE_WORKER_SUCCESS, payload: item});
};
