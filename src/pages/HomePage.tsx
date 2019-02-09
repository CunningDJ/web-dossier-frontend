import * as React from 'react';
import { Link } from 'react-router-dom';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import './HomePage.css';


interface IHomePageProps {}
interface IHomePageState {}

export default class UrlScraperPage extends React.Component<IHomePageProps, IHomePageState> {
  public render() {
    return (
      <div className="home-page">
        <DefaultNavbar title="Home" />
        <h1>Welcome to Web Dossier</h1>
        <p>Here, you can get visualizations of the data on any web page.</p>
        <div className="home-page__page-links item-box">
            <h2>Tools</h2>
            <Link to="/url-scraper">
              <button className="home-page__tool-button">URL Scraper</button>
            </Link>
        </div>
      </div>
    );
  }
}
