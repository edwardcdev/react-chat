import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const GuestRoute = ({ component: Component, isAuthenticated, workspace, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !!workspace && isAuthenticated
        ? <Redirect to={`/${workspace.displayName}`} />
        : <Component {...props} />
    )}
  />
);

const mapStateToProps = ({ auth: { isAuthenticated }, workspaceApp: { workspace } }) => ({
  isAuthenticated,
  workspace,
});

export default connect(mapStateToProps)(GuestRoute);
