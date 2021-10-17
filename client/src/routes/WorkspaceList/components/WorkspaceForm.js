import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';
import { renderInput } from '../../../components/form';
import { workspaceFormValidate } from '../../../helpers/validates';

const WorkspaceForm = ({ submitting, loading, handleSubmit }) => (
  <div className="flex-column align-items-center">
    <Field name="fullName" type="text" label="Full Name" component={renderInput} />
    <Field name="displayName" type="text" label="Display Name" component={renderInput} />
    <Field name="adminEmail" type="email" label="Admin User" component={renderInput} />
    <Field name="adminPassword" type="password" label="Password" component={renderInput} />
    <Field name="adminPasswordConfirm" type="password" label="Confirm Password" component={renderInput} />
    <Row>
      <Col xs="6">
        <Button color="primary" className="px-4" disabled={submitting || loading} onClick={handleSubmit}>Create Workspace</Button>
      </Col>
    </Row>
  </div>
);

export default reduxForm({
  form: 'workspaceForm',
  onSubmit: (values, dispatch, props) => {
    props.createWorkspace(values);
  },
  validate: workspaceFormValidate,
})(WorkspaceForm);
