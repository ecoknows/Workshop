import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface NotificationsInterface {
  _id?: string;

  sender_id: string;
  sender_name: string;
  sender_profile: string;

  reciever_id: string;

  description: string;
  seen: boolean;
}

export const NOTIFICATIONS_REQUEST = 'NOTIFICATIONS_REQUEST';
export const NOTIFICATIONS_SUCCESS = 'NOTIFICATIONS_SUCCESS';
export const NOTIFICATIONS_FAIL = 'NOTIFICATIONS_FAIL';

export const SELECTED_NOTIFICATIONS_REQUEST = 'SELECTED_NOTIFICATIONS_REQUEST';
export const SELECTED_NOTIFICATIONS_SUCCESS = 'SELECTED_NOTIFICATIONS_SUCCESS';
export const SELECTED_NOTIFICATIONS_FAIL = 'SELECTED_NOTIFICATIONS_FAIL';

interface NotificationsSuccessType extends DefaultPropertiesInterface {
  data?: NotificationsInterface | null | object;
}

export type NotificationsReducerType = NotificationsSuccessType;
export type NotificationsActionType =
  | RequestInterface<typeof NOTIFICATIONS_REQUEST>
  | RequestInterface<typeof SELECTED_NOTIFICATIONS_FAIL>
  | SuccessAndFailInterface<
      typeof NOTIFICATIONS_SUCCESS | typeof NOTIFICATIONS_FAIL,
      NotificationsInterface
    >
  | SuccessAndFailInterface<
      | typeof SELECTED_NOTIFICATIONS_SUCCESS
      | typeof SELECTED_NOTIFICATIONS_FAIL,
      NotificationsInterface
    >;
