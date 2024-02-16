import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './index.css';

import LandingPage from './pages/LandingPage/LandingPage';
import TvSeries from './pages/TvShowPage/TvSeries';
import Movies from './pages/Movies/Movies';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import TvShowDetails from './pages/TvSeriesDetails/TvShowDetails';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Navbar from './component/Navbar/Navbar';
import MobileNav from './component/Navbar/MobileNav/MobileNav';
import Register from './pages/Register-Login/Register';
import Login from './pages/Register-Login/Login';
import ErrorPage from './component/ErrorBox/ErrorPage';

import { saveWatchedMediaIds, saveWishMediaIds } from './common-functions/functions';

// profile page is the default page where user will be redirected if logged in
// or else user will be again redirected from profile page to home page
function App() {
  console.log('render')
  saveWatchedMediaIds('app');
  saveWishMediaIds();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={ LandingPage } />
        <Route exact path="/movies" component={ Movies } />
        <Route exact path="/tv-series" component={ TvSeries } />
        <Route exact path="/search" component={ Search } />
        
        <Route exact path="/movie/:id" component={ MovieDetails } />
        <Route exact path="/tv/:id" component={ TvShowDetails } />

        <Route exact path="/user/register" component={ Register } />
        <Route exact path="/user/login" component={ Login } />
        <Route exact path={['/', "/profile"]} component={ Profile } />
        
        <Route component={ ErrorPage } />
      </Switch>
      <MobileNav />
    </Router>
  );
}

export default App;