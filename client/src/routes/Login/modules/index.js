export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('chatting_app_token'),
  error: null
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, isAuthenticated: false, error: null };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };

    case LOGIN_ERROR:
      return { ...state, loading: false, error: action.error };

    case LOGOUT_SUCCESS:
      return { ...state, loading: false, isAuthenticated: false };

    default:
      return state;
  }
};

export default auth;
