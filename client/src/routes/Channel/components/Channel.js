import React from 'react';
import moment from 'moment-timezone';
import MessageInput from './MessageInput';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    const { match: { params: { channelId } } } = this.props;
    this.state = {
      channelId,
    };
  }

  componentDidMount() {
    const { channels, socket, receiveMessage, getMessages } = this.props;
    const { channelId } = this.state;
    const channel = channels.find((channel) => channel.id === channelId);
    socket.on('new message', (message) => {
      receiveMessage(message);
    });
    if (!channel.messages || channel.messages.length === 0) {
      getMessages(channel);
    }
  }

  componentDidUpdate() {
    const { loading } = this.props;
    if (!loading) {
      const messageList = this.refs.messageList;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  render() {
    const { loading, sendMessage, channels } = this.props;
    const channel = channels.find((channel) => channel.id === this.state.channelId);
    if (loading) {
      return (<div>Loading...</div>);
    }

    let messages = [];
    if (channel.messages) {
      let prevDate = '';
      channel.messages.forEach((message) => {
        if (prevDate !== moment(message.createdAt).format('dddd, MMMM Do')) {
          prevDate = moment(message.createdAt).format('dddd, MMMM Do');
          messages.push(
            <div key={prevDate} className="channel-chat-message-divider">
              <div className="channel-chat-message-divider__line">
              </div>
              <div className="channel-chat-message-divider__date">
                {prevDate}
              </div>
            </div>
          );
        }
        messages.push(
          <div key={message.id} className="channel-chat-message-item">
            <div className="chat-message-item">
              <div className="chat-message-item__header">
                <div className="chat-message-item__sender">{message.author.username}</div>
                <div className="chat-message-item__timestamp">
                  {`${moment(message.createdAt).format('YYYY-MM-DD h:mm A')}`}
                </div>
              </div>
              <div className="chat-message-item__content">
                <div className="chat-message-item__gutter">
                  <div className="chat-message-item__timestamp text-secondary">
                    {`${moment(message.createdAt).format('h:mm A')}`}
                  </div>
                </div>
                <div className="chat-message-item__body">
                  {message.body}
                </div>
              </div>
            </div>
          </div>
        )
      });
    }

    return (
      <div className="channel-chat-container">
        <div className="channel-chat-header">
          <div className="channel-info">
            <div className="channel-info__name"># {channel.name}</div>
            <div className="channel-info__purpose">{channel.purpose}</div>
          </div>
          <div className="channel-actions">
          </div>
        </div>
        <div className="channel-chat-body">
          <div className="channel-chat-message-container">
            <div className="channel-chat-messages" ref="messageList">
              {messages}
            </div>
            <div className="channel-chat-input-container">
              <MessageInput channel={channel} sendMessage={sendMessage} />
            </div>
          </div>
          <div className="channel-chat-sidebar">
          </div>
        </div>
      </div>
    );
  }
};

export default Channel;
