import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { renderInput } from '../../../components/form';
import { loginFormValidate } from '../../../helpers/validates';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { submitting, loading, handleSubmit, workspace } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <h1 className="text-center">Workspace # {workspace.fullName}</h1>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Field name="email" type="email" label="Email" component={renderInput} />
                    <Field name="password" type="password" label="Password" component={renderInput} />
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" disabled={submitting || loading} onClick={handleSubmit}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to="/" className="btn btn-link">Back to list</Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>When you are going to chat with friends, teams, family, or to integrate other awesome apps, ChattingApp has you covered.</p>
                      <Link to={`/${workspace.displayName}/register`} className="mt-3 btn btn-primary active">Register Now!</Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
  onSubmit: (values, dispatch, props) => {
    props.loginUser(values);
  },
  validate: loginFormValidate,
})(Login);
