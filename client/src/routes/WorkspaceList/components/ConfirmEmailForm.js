import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Button,
  Alert,
} from 'reactstrap';
import { renderInput } from '../../../components/form';
import { confirmEmailValidate } from '../../../helpers/validates';

const ConfirmEmailForm = ({ submitting, confirming, handleSubmit, confirmed }) => (
  <div className="flex-column align-items-center">
    <Field name="email" type="email" label="Email" component={renderInput} />
    <Row>
      <Col xs="6">
        <Button color="primary" className="px-4" disabled={submitting || confirming} onClick={handleSubmit}>Confirm Email</Button>
      </Col>
    </Row>
  </div>
);

export default reduxForm({
  form: 'confirmEmailForm',
  onSubmit: (values, dispatch, props) => {
    props.confirmEmailRequest(values);
  },
  validate: confirmEmailValidate,
})(ConfirmEmailForm);
