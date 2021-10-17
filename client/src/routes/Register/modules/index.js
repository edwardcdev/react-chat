export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

const initialState = {
  loading: false,
  success: true,
  error: null
};

const register = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, success: false, error: null };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, success: true };

    case REGISTER_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default register;
