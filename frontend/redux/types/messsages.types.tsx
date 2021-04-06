import {
  DefaultPropertiesInterface,
  RequestInterface,
  SuccessAndFailInterface,
} from './main.types';

export interface MessageInterface {
  _id: string;
  author_id: string;
  author_profile: string;
  author_name: string;

  reciever_id: string;
  reciever_name: string;
  reciever_profile: string;

  message: string;
  attached_message: string;
}

export const MESSAGES_REQUEST = 'MESSAGES_REQUEST';
export const MESSAGES_SUCCESS = 'MESSAGES_SUCCESS';
export const MESSAGES_FAIL = 'MESSAGES_FAIL';

export const CHAT_REQUEST = 'CHAT_REQUEST';
export const CHAT_SUCCESS = 'CHAT_SUCCESS';
export const CHAT_FAIL = 'CHAT_FAIL';

interface MessagesSuccessType extends DefaultPropertiesInterface {
  data?: MessageInterface | null | object;
}

export type MessagesReducerType = MessagesSuccessType;
export type MessagesActionType =
  | RequestInterface<typeof MESSAGES_REQUEST>
  | RequestInterface<typeof CHAT_REQUEST>
  | SuccessAndFailInterface<
      typeof CHAT_SUCCESS | typeof CHAT_FAIL,
      MessageInterface
    >
  | SuccessAndFailInterface<
      typeof MESSAGES_SUCCESS | typeof MESSAGES_FAIL,
      MessageInterface
    >;
