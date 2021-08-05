import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute:React.FC<Props> = (props:Props) => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default PrivateRoute;
