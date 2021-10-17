export const CHANNEL_GET_REQUEST = 'CHANNEL_GET_REQUEST';
export const CHANNEL_GET_SUCCESS = 'CHANNEL_GET_SUCCESS';
export const CHANNEL_GET_ERROR = 'CHANNEL_GET_ERROR';

const initialState = {
  loading: false,
  error: null,
};

const channel = (state = initialState, action) => {
  switch(action.type) {
    case CHANNEL_GET_REQUEST:
      return { ...state, loading: true, error: null };

    case CHANNEL_GET_SUCCESS:
      return { ...state, loading: false };

    case CHANNEL_GET_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default channel;
