import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../../../routes/Login';
import Register from '../../../routes/Register'
import PrivateApp from '../../PrivateApp';

import GuestRoute from '../../../route-helpers/GuestRoute';
import PrivateRoute from '../../../route-helpers/PrivateRoute';

class WorkspaceApp extends React.Component {
  constructor(props) {
    super(props);

    const { match: { params: { workspaceName } } } = this.props;
    this.state = {
      workspaceName,
    };
  }

  componentDidMount() {
    this.props.getWorkspace(this.state.workspaceName);
  }

  render() {
    const { loading, workspace, match: { path } } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Switch>
        <GuestRoute path={`${path}/login`} component={Login} />
        <GuestRoute path={`${path}/register`} component={Register} />
        <PrivateRoute path={`${path}`} component={PrivateApp} />
      </Switch>
    );
  }
}

export default WorkspaceApp;
