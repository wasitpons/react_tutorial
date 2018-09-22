import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TestPage from './pages/TestPage/TestPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/test" component={TestPage} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;