import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TestPage from './pages/TestPage/TestPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GameStartPage from './pages/GameStartPage/GameStartPage';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/test" component={TestPage} />
      <Route exact path="/game-start" component={GameStartPage} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;