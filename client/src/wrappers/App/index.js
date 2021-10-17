import React, { Fragment } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Switch, Redirect, Route } from 'react-router-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import GuestRoute from '../../route-helpers/GuestRoute';
import PrivateRoute from '../../route-helpers/PrivateRoute';

import Login from '../../routes/Login';
import Register from '../../routes/Register';
import Dashboard from '../../routes/Dashboard';
import WorkspaceList from '../../routes/WorkspaceList';

import WorkspaceApp from '../WorkspaceApp';

const App = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={WorkspaceList} />
      <Route path="/:workspaceName" component={WorkspaceApp} />

    </Switch>
    <ReduxToastr
      timeOut={3000}
      preventDuplicates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  </Fragment>
);

export default App;
