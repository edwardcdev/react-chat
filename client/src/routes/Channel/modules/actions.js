import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import {
  CHANNEL_GET_REQUEST,
  CHANNEL_GET_SUCCESS,
  CHANNEL_GET_ERROR,
} from './index';
import {
  APP_CHANNEL_MESSAGES,
  APP_CHANNEL_RECEIVE_MESSAGE,
} from '../../../wrappers/PrivateApp/modules';
import { authorizedRequest } from '../../../utils/apiCaller';

export const getMessages = (channel) => {
  return async (dispatch) => {
    dispatch({ type: CHANNEL_GET_REQUEST });
    try {
      const messageResponse = await authorizedRequest('get', `/messages/${channel.id}`);
      dispatch({
        type: APP_CHANNEL_MESSAGES,
        payload: {
          channel,
          messages: messageResponse.data.messages,
          lastFetchDate: messageResponse.data.lastFetchDate,
          moreCount: messageResponse.data.moreCount,
        },
      });
      dispatch({ type: CHANNEL_GET_SUCCESS });
    } catch (error) {
      dispatch({
        type: CHANNEL_GET_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};

export const sendMessage = (channel, message) => {
  return async (dispatch, getState) => {
    const { app: { currentUser } } = getState();
    try {
      const body = {
        author: currentUser.id,
        body: message,
        channel: channel.id,
      };
      await authorizedRequest('post', `/messages`, { body });
      dispatch(reset('messageInputForm'));
    } catch (error) {
      dispatch({
        type: CHANNEL_GET_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};

export const receiveMessage = (message) => ({
  type: APP_CHANNEL_RECEIVE_MESSAGE,
  payload: message,
});
