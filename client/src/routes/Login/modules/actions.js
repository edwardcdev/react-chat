import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './index';
import { anonymousRequest } from '../../../utils/apiCaller';

export const loginUser = (form) => {
  return async (dispatch, getState) => {
    const { workspaceApp: { workspace } } = getState();
    dispatch({ type: LOGIN_REQUEST });
    try {
      const body = { ...form, workspace: workspace.id };
      const response = await anonymousRequest('post', '/auth/login', { body });
      localStorage.setItem('chatting_app_token', JSON.stringify(response.data.token));
      localStorage.setItem('chatting_app_user_email', response.data.user.email);
      localStorage.setItem('chatting_app_workspace', workspace.displayName);
      dispatch({ type: LOGIN_SUCCESS });
      dispatch(reset('loginForm'));
      dispatch(push(`/${workspace.displayName}`));
      toastr.success(`Welcome ${response.data.user.username}!`);
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};
