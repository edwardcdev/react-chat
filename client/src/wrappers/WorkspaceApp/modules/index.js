export const WORKSPACE_APP_GET_REQUEST = 'WORKSPACE_APP_GET_REQUEST';
export const WORKSPACE_APP_GET_SUCCESS = 'WORKSPACE_APP_GET_SUCCESS';
export const WORKSPACE_APP_GET_ERROR = 'WORKSPACE_APP_GET_ERROR';

const initialState = {
  loading: true,
  workspace: null,
  error: null,
};

const workspaceApp = (state = initialState, action) => {
  switch(action.type) {
    case WORKSPACE_APP_GET_REQUEST:
      return { ...state, loading: true, workspace: null, error: null };

    case WORKSPACE_APP_GET_SUCCESS:
      return { ...state, loading: false, workspace: action.payload };

    case WORKSPACE_APP_GET_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default workspaceApp;
