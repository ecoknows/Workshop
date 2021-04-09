import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {TASK_FAIL, TASK_SUCCESS} from '../types/tasks.types';

export const fetch_tasks = () => async (dispatch: any, getState: any) => {
  const {
    userDetails: {userData},
    singleWorkerState,
  } = getState();

  try {
    const {data} = await Axios.get(
      `/tasks/all?job_id=${singleWorkerState.data.job_id}&worker_id=${singleWorkerState.data.worker_id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );
    if (data) {
      dispatch({type: TASK_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const update_status = (task_id: string, index: number) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
    taskState,
  } = getState();

  try {
    const {data} = await Axios.get(`/tasks/${task_id}/status`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      const updatedData = taskState.data;
      updatedData[index].status = data.status;
      dispatch({type: TASK_SUCCESS, payload: updatedData});
    }
  } catch (error) {
    console.log(error);
  }
};

export const add_task = (info: any) => async (dispatch: any, getState: any) => {
  const {
    userDetails: {userData},
  } = getState();
  if (info.name == '') {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'No a task name!',
      text2: 'Please add task name ',
      visibilityTime: 2000,
      autoHide: true,
    });
    return;
  }

  try {
    const {data} = await Axios.post(`/tasks/add`, info, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      dispatch(fetch_tasks());
    }
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
