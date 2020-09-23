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

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9ac4d8',
      main: '#45839e',
      dark: '#1b4d60',
    },
    secondary: {
      light: '#e695c4',
      main: '#dd4f99',
      dark: '#9d2e6f',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
