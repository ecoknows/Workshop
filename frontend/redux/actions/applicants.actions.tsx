import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {notify_someone} from '../../constants/notification_request';
import {
  APPLICANTS_FAIL,
  APPLICANTS_REQUEST,
  APPLICANTS_SUCCESS,
  SELECTED_APPLICANTS_FAIL,
  SELECTED_APPLICANTS_REQUEST,
  SELECTED_APPLICANTS_SUCCESS,
} from '../types/applicants.types';

export const get_applicant_info = (applicant_info: any) => async (
  dispatch: any,
  getState: any,
) => {
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(
      `/applicants/get/selected?_id=${applicant_info.applicant_id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: SELECTED_APPLICANTS_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: SELECTED_APPLICANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const get_applicant = () => async (dispatch: any, getState: any) => {
  dispatch({type: APPLICANTS_REQUEST});
  const {
    userDetails: {userData},
    jobsSelectedState: {jobSelected},
  } = getState();

  try {
    const {data} = await Axios.get(
      `/applicants/get?job_id=${jobSelected._id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: APPLICANTS_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: APPLICANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const get_applicant_contact_person = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: APPLICANTS_REQUEST});
  const {
    userDetails: {userData},
  } = getState();

  try {
    const {data} = await Axios.get(
      `/applicants/get?person_of_contact_id=${userData._id}`,
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: APPLICANTS_SUCCESS, payload: data});
    }
  } catch (error) {
    dispatch({
      type: APPLICANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const add_applicant = (applicant_info: object) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({type: APPLICANTS_REQUEST});
  const {
    userDetails: {userData},
    jobsSelectedState: {jobSelected},
  } = getState();
  try {
    const {data} = await Axios.post(
      `/applicants/add`,
      {
        ...applicant_info,
        applicant_id: userData._id,
        applicant_name: userData.full_name,

        person_of_contact_profile: jobSelected.employer_profile
          ? jobSelected.employer_profile
          : null,
        applicant_name_profile: userData.profile_pic
          ? userData.profile_pic
          : null,
      },
      {
        headers: {Authorization: `Bearer ${userData.token}`},
      },
    );

    if (data) {
      dispatch({type: APPLICANTS_SUCCESS, payload: data});

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Application Sent!',
        text2: 'Wait a further notice from the Employer',
        visibilityTime: 2000,
        autoHide: true,
      });

      notify_someone(userData, {
        sender_id: userData._id,
        sender_name: userData.full_name,
        sender_profile: userData.profile_pic,

        reciever_id: jobSelected.employer_id,

        description: 'Application Notice',
      });
      await Axios.get(
        `/jobs/current_applicants?status=new&_id=${jobSelected._id}`,
      );
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'You already Applied!',
      text2: 'Application already sent please wait',
      visibilityTime: 2000,
      autoHide: true,
    });
    dispatch({
      type: APPLICANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
