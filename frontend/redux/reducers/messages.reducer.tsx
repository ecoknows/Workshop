import {
  CHAT_FAIL,
  CHAT_REQUEST,
  CHAT_SUCCESS,
  MessagesActionType,
  MessagesReducerType,
  MESSAGES_FAIL,
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
} from '../types/messsages.types';

const initialState: MessagesReducerType = {
  loading: false,
  data: null,
  error: false,
};

export const messagesReducerType = (
  state: MessagesReducerType = initialState,
  action: MessagesActionType,
): MessagesReducerType => {
  switch (action.type) {
    case MESSAGES_REQUEST:
      return {loading: true};
    case MESSAGES_SUCCESS:
      return {loading: false, data: action.payload};
    case MESSAGES_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const chatReducerType = (
  state: MessagesReducerType = initialState,
  action: MessagesActionType,
): MessagesReducerType => {
  switch (action.type) {
    case CHAT_REQUEST:
      return {loading: true};
    case CHAT_SUCCESS:
      return {loading: false, data: action.payload};
    case CHAT_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
