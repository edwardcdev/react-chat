export const WORKSPACE_LIST_GET_REQUEST = 'WORKSPACE_LIST_GET_REQUEST';
export const WORKSPACE_LIST_GET_SUCCESS = 'WORKSPACE_LIST_GET_SUCCESS';
export const WORKSPACE_LIST_GET_ERROR = 'WORKSPACE_LIST_GET_ERROR';
export const WORKSPACE_CREATE_REQUEST = 'WORKSPACE_CREATE_REQUEST';
export const WORKSPACE_CREATE_SUCCESS = 'WORKSPACE_CREATE_SUCCESS';
export const WORKSPACE_CREATE_ERROR = 'WORKSPACE_CREATE_ERROR';
export const WORKSPACE_LIST_CHANGE_TAB = 'WORKSPACE_LIST_CHANGE_TAB';
export const WORKSPACE_CONFIRM_EMAIL_REQUEST = 'WORKSPACE_CONFIRM_EMAIL_REQUEST';
export const WORKSPACE_CONFIRM_EMAIL_SUCCESS = 'WORKSPACE_CONFIRM_EMAIL_SUCCESS';
export const WORKSPACE_CONFIRM_EMAIL_ERROR = 'WORKSPACE_CONFIRM_EMAIL_ERROR';

export const WORKSPACE_LIST_TAB_LIST = 'WORKSPACE_LIST_TAB_LIST';
export const WORKSPACE_LIST_TAB_CREATE = 'WORKSPACE_LIST_TAB_CREATE';
export const WORKSPACE_LIST_TAB_CONFIRM = 'WORKSPACE_LIST_TAB_CONFIRM';

const initialState = {
  loading: true,
  error: null,
  workspaces: null,
  creating: false,
  createError: null,
  activeTab: WORKSPACE_LIST_TAB_LIST,
  confirming: false,
  confirmed: false,
};

const workspaceList = (state = initialState, action) => {
  switch(action.type) {
    case WORKSPACE_LIST_GET_REQUEST:
      return { ...state, loading: true, error: null };

    case WORKSPACE_LIST_GET_SUCCESS:
      return { ...state, loading: false, workspaces: action.payload };

    case WORKSPACE_LIST_GET_ERROR:
      return { ...state, loading: false, error: action.error };

    case WORKSPACE_CREATE_REQUEST:
      return { ...state, creating: true, createError: null };

    case WORKSPACE_CREATE_SUCCESS:
      return { ...state, creating: false };

    case WORKSPACE_CREATE_ERROR:
      return { ...state, creating: false, createError: action.error };

    case WORKSPACE_LIST_CHANGE_TAB:
      return { ...state, activeTab: action.payload };

    case WORKSPACE_CONFIRM_EMAIL_REQUEST:
      return { ...state, confirming: false, confirmed: false };

    case WORKSPACE_CONFIRM_EMAIL_SUCCESS:
      return { ...state, confirming: false, confirmed: true };

    case WORKSPACE_CONFIRM_EMAIL_ERROR:
      return { ...state, confirming: false, error: action.error };

    default:
      return state;
  }
};

export default workspaceList;
