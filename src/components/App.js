import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import routes from '../routes';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path={routes.HOME_PAGE} component={HomePage} />
        <Route path={routes.MOVIES_PAGE} component={MoviesPage} />
        <Route path={routes.MOVIE_DETAILS_PAGE} component={MovieDetailsPage} />
        <Redirect to={routes.HOME_PAGE} />
      </Switch>
    </div> 
  </BrowserRouter>
);

export default App;
