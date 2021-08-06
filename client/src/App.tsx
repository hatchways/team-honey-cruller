import { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import SubmitDesign from './pages/SubmitDesign/SubmitDesign';
import Signup from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Discovery from './pages/Discovery/Discovery';
import CreateContest from './pages/CreateContest/CreateContest';
import AboutArtist from './pages/AboutArtist/AboutArtist';
import Settings from './pages/Settings/Settings';
import Contest from './pages/Contest/Contest';
import Notifications from './pages/Notifications/Notifications';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { NotificationProvider } from './context/notificationContext';
import { TourProvider } from './context/tourContext';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <NotificationProvider>
                <TourProvider>
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/submit-design/:id" component={SubmitDesign} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/messages" component={Dashboard} />
                    <Route exact path="/create-contest" component={CreateContest} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/notifications" component={Notifications} />
                    <Route exact path="/contest/:id" component={Contest} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route path="/reset-password/:token/:id" component={ResetPassword} />
                    <Route exact path="/artist" component={AboutArtist} />
                    <Route exact path="/dashboard" component={Discovery} />
                    <Route path="*">
                      <Redirect to="/dashboard" />
                    </Route>
                  </Switch>
                </TourProvider>
              </NotificationProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
