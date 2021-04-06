import Axios from 'axios';
import {
  NOTIFICATIONS_FAIL,
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  SELECTED_NOTIFICATIONS_REQUEST,
  SELECTED_NOTIFICATIONS_SUCCESS,
} from '../types/notifications.types';

export const select_notification = (notification: any) => (dispatch: any) => {
  dispatch({type: SELECTED_NOTIFICATIONS_REQUEST});
  dispatch({type: SELECTED_NOTIFICATIONS_SUCCESS, payload: notification});
};

export const get_notifications = () => async (dispatch: any, getState: any) => {
  dispatch({type: NOTIFICATIONS_REQUEST});

  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(`/notification/get/${userData._id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      dispatch({type: NOTIFICATIONS_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delete_notification = (delNotifs: any) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
    notificationsState,
  } = getState();

  try {
    const deletedNotifs = notificationsState.data.filter(
      (item: any) => item._id != delNotifs._id,
    );

    dispatch({type: NOTIFICATIONS_SUCCESS, payload: deletedNotifs});
    await Axios.delete(`/notification/delete/${delNotifs._id}`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });
  } catch (error) {
    console.log(error, 'error');

    dispatch({
      type: NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
