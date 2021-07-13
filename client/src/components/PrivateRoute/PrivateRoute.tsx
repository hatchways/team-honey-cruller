import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
  loggedIn: boolean;
}> = (props) => {
  const loggedIn = props.loggedIn;
  return loggedIn ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
