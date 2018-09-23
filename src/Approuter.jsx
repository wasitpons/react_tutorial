import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TestPage from './pages/TestPage/TestPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GameStartPage from './pages/GameStartPage/GameStartPage';
import ShowDataPage from './pages/ShowDataPage/ShowDataPage';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/test" component={TestPage} />
      <Route exact path="/game-start" component={GameStartPage} />
      <Route exact path="/show-data" component={ShowDataPage} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;