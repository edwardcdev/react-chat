import React from 'react';

const renderTextArea = ({ input }) => (
  <textarea
    {...input}
    placeholder="Enter a new message"
    className="chat-new-message form-control"
  ></textarea>
);

export default renderTextArea;
