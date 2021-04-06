import {
  NotificationsActionType,
  NotificationsReducerType,
  NOTIFICATIONS_FAIL,
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  SELECTED_NOTIFICATIONS_FAIL,
  SELECTED_NOTIFICATIONS_REQUEST,
  SELECTED_NOTIFICATIONS_SUCCESS,
} from '../types/notifications.types';

const initialState: NotificationsReducerType = {
  loading: false,
  data: null,
  error: false,
};

export const notificationsReducerType = (
  state: NotificationsReducerType = initialState,
  action: NotificationsActionType,
): NotificationsReducerType => {
  switch (action.type) {
    case NOTIFICATIONS_REQUEST:
      return {loading: true};
    case NOTIFICATIONS_SUCCESS:
      return {loading: false, data: action.payload};
    case NOTIFICATIONS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const selectedNotificationsReducerType = (
  state: NotificationsReducerType = initialState,
  action: NotificationsActionType,
): NotificationsReducerType => {
  switch (action.type) {
    case SELECTED_NOTIFICATIONS_REQUEST:
      return {loading: true};
    case SELECTED_NOTIFICATIONS_SUCCESS:
      return {loading: false, data: action.payload};
    case SELECTED_NOTIFICATIONS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
