import {
  WORKSPACE_LIST_GET_REQUEST,
  WORKSPACE_CREATE_REQUEST,
  WORKSPACE_LIST_CHANGE_TAB,
  WORKSPACE_CONFIRM_EMAIL_REQUEST,
} from './';

export const getWorkspaceListRequest = () => (
  { type: WORKSPACE_LIST_GET_REQUEST }
);

export const createWorkspaceRequest = values => (
  { type: WORKSPACE_CREATE_REQUEST, payload: values }
);

export const changeTab = tab => (
  { type: WORKSPACE_LIST_CHANGE_TAB, payload: tab }
);

export const confirmEmailRequest = (values) => (
  { type: WORKSPACE_CONFIRM_EMAIL_REQUEST, payload: values }
);
