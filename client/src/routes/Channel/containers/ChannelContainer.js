import { connect } from 'react-redux';
import io from 'socket.io-client';
import Channel from '../components/Channel';
import {
  getMessages,
  sendMessage,
  receiveMessage,
} from '../modules/actions';

const socket = io.connect(process.env.REACT_APP_DEV_SOCKET_URL, { path: '/api/chat' });

export default connect(
  ({ app, channel }) => ({
    currentUser: app.currentUser,
    channels: app.channels,
    ...channel,
    socket,
  }),
  (dispatch) => ({
    getMessages: (channel) => (dispatch(getMessages(channel))),
    sendMessage: (channel, message) => dispatch(sendMessage(channel, message)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
  }),
)(Channel);
