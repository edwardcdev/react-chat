import { WORKSPACE_APP_GET_REQUEST } from './';

export const getWorkspace = name => (
  { type: WORKSPACE_APP_GET_REQUEST, payload: name }
);
