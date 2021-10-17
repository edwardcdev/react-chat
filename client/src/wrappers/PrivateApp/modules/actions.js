import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {
  APP_USER_REQUEST,
  APP_USER_SUCCESS,
} from './index';
import { LOGOUT_SUCCESS } from '../../../routes/Login/modules';

import { authorizedRequest } from '../../../utils/apiCaller';

export const loadProfile = () => {
  return async (dispatch, getState) => {
    const { workspaceApp: { workspace } } = getState();
    dispatch({ type: APP_USER_REQUEST });
    try {
      const response = await authorizedRequest('get', '/users/profile');
      const channelsResponse = await authorizedRequest('get', '/channels');
      const generalChannel = channelsResponse.data.find(channel => channel.name === 'general');
      dispatch({
        type: APP_USER_SUCCESS,
        payload: {
          user: response.data,
          channels: channelsResponse.data,
        },
      });
      dispatch(push(`/${workspace.displayName}/messages/${generalChannel.id}`));
    } catch (error) {
      dispatch(logoutUser());
    }
  };
};

export const logoutUser = () => (
  (dispatch, getState) => {
    const { workspaceApp: { workspace } } = getState();
    localStorage.removeItem('chatting_app_token');
    localStorage.removeItem('chatting_app_user_email');
    localStorage.removeItem('chatting_app_workspace');
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(push(`/${workspace.displayName}/login`));
    toastr.success('User logout');
  }
);
