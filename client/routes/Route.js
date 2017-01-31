import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import ViewerQuery from './ViewerQuery';
import { AppContainer, MainContainer } from '../relay/containers';
import { SignupContainer, LoginContainer, ExportContainer } from '../ui/containers';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={MainContainer} queries={ViewerQuery} />
    <Route path='/signup' component={SignupContainer} />
    <Route path='/login' component={LoginContainer} />
    <Redirect from='*' to='/' />
  </Route>
);

