import Axios from 'axios';
import {
  CHAT_FAIL,
  CHAT_REQUEST,
  CHAT_SUCCESS,
  MESSAGES_FAIL,
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
} from '../types/messsages.types';

export const get_latest_messages = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: MESSAGES_REQUEST});
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(`/messages/get/${userData._id}/latest`, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      dispatch({type: MESSAGES_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const send_message = (messageData: any) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.post(`/messages/send`, messageData, {
      headers: {Authorization: `Bearer ${userData.token}`},
    });

    if (data) {
      // dispatch({type: MESSAGES_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const update_latest_chat = (new_chat: any) => (
  dispatch: any,
  getState: any,
) => {
  const {
    chatState: {data},
  } = getState();
  dispatch({type: CHAT_SUCCESS, payload: [new_chat, ...data]});
};

export const get_chats = (author_id: string) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: CHAT_REQUEST});
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(
      `/messages/get/chat?reciever_id=${userData._id}&author_id=${author_id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: CHAT_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
