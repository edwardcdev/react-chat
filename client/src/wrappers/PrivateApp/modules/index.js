export const APP_USER_REQUEST = 'APP_USER_REQUEST';
export const APP_USER_SUCCESS = 'APP_USER_SUCCESS';
export const APP_USER_ERROR = 'APP_USER_ERROR';
export const APP_CHANNEL_MESSAGES = 'APP_CHANNEL_MESSAGES';
export const APP_CHANNEL_RECEIVE_MESSAGE = 'APP_CHANNEL_RECEIVE_MESSAGE';

const initialState = {
  loading: true,
  currentUser: null,
  channels: null,
  messages: null,
  error: null,
};

const app = (state = initialState, action) => {
  let { channels } = state;
  let newChannels = !channels ? [] : [...channels], channelIndex;

  switch(action.type) {
    case APP_USER_REQUEST:
      return { ...state, loading: true, currentUser: null, error: null, channels: null };

    case APP_USER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload.user, channels: action.payload.channels };

    case APP_USER_ERROR:
      return { ...state, loading: false, error: action.error };

    case APP_CHANNEL_MESSAGES:
      channelIndex = newChannels.findIndex((channel => channel.id === action.payload.channel.id));
      newChannels[channelIndex].messages = action.payload.messages;
      newChannels[channelIndex].lastFetchDate = action.payload.lastFetchDate;
      return { ...state, newChannels };

    case APP_CHANNEL_RECEIVE_MESSAGE:
      channelIndex = newChannels.findIndex((channel => channel.id === action.payload.channel));
      if (!newChannels[channelIndex].messages) {
        newChannels[channelIndex].messages = [];
      }
      newChannels[channelIndex].messages.push(action.payload);
      return { ...state, channels: newChannels };

    default:
      return state;
  }
};

export default app;
