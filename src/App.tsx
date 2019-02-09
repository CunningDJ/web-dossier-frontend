import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UrlScraperPage from './pages/UrlScraperPage';

import './style/global.css';
import './App.css';


interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <div className="app">
        <div className="app__background" />
        <Router>
        <div>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/url-scraper" component={UrlScraperPage} />
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
