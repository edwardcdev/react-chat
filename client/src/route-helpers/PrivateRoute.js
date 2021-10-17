import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, workspace, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !!workspace
        ?
          isAuthenticated ? <Component {...props} /> : <Redirect to={`${workspace.displayName}/login`} />
        :
          <Redirect to="/" />
    )}
  />
);

const mapStateToProps = ({ auth: { isAuthenticated }, workspaceApp: { workspace } }) => ({
  isAuthenticated,
  workspace,
});

export default connect(mapStateToProps)(PrivateRoute);
