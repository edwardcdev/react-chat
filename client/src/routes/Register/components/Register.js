import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { renderInput } from '../../../components/form';
import { registerFormValidate } from '../../../helpers/validates';

const Register = ({ submitting, loading, handleSubmit, workspace }) => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <h1 className="text-center">Workspace # {workspace.fullName}</h1>
          <Card className="mx-4">
            <CardBody className="p-4">
              <h1>Register</h1>
              <p className="text-muted">Create your account</p>
              <Field name="email" type="email" label="Email" component={renderInput} />
              <Field name="username" type="text" label="Username" component={renderInput} />
              <Field name="password" type="password" label="Password" component={renderInput} />
              <Field name="confirmPassword" type="password" label="Confirm Password" component={renderInput} />
              <div className="d-flex justify-content-between align-items-center">
                <Button color="success" disabled={submitting || loading} onClick={handleSubmit}>Create Account</Button>
                <Link to={`/${workspace.displayName}/login`} disabled={submitting || loading}>Already have an account?</Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default reduxForm({
  form: 'registerForm',
  onSubmit: (values, dispatch, props) => {
    props.registerUser(values);
  },
  validate: registerFormValidate,
})(Register);
