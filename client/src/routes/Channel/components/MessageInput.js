import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
} from 'reactstrap';
import { renderTextArea } from '../../../components/form';

const MessageInput = ({ handleSubmit }) => {
  return (
    <form noValidate onSubmit={handleSubmit} className="d-flex">
      <Field name="new_message" component={renderTextArea} />
      <Button type="submit" color="primary">
        <i className="icon-paper-plane"></i>
      </Button>
    </form>
  );
};

export default reduxForm({
  form: 'messageInputForm',
  onSubmit: (values, dispatch, props) => {
    props.sendMessage(props.channel, values.new_message);
  },
})(MessageInput);
