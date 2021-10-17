import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './index';
import { anonymousRequest } from '../../../utils/apiCaller';

export const registerUser = (form) => {
  return async (dispatch, getState) => {
    const { workspaceApp: { workspace } } = getState();
    dispatch({ type: REGISTER_REQUEST });
    try {
      const body = { ...form, workspace: workspace.id };
      await anonymousRequest('post', '/auth/register', { body });
      dispatch({ type: REGISTER_SUCCESS });
      dispatch(reset('registerForm'));
      dispatch(push(`/${workspace.displayName}/login`));
      toastr.success('User registered successfully');
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};
