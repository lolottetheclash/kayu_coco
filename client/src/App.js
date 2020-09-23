import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Travels from './components/travels/pages/Travels';
import LandingPage from './components/landing/pages/LandingPage';
import NavBar from './components/shared/NavBar';
import Login from './components/user/Login';

function App() {
  return (
    <Router>
        <NavBar />
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/travels" exact>
          <Travels />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
