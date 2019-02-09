import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import UrlScraperPanel from '../parts/UrlScraperPanel/UrlScraperPanel';

import './UrlScraperPage.css';


interface IUrlScraperPageProps {}
interface IUrlScraperPageState {}

export default class UrlScraperPage extends React.Component<IUrlScraperPageProps, IUrlScraperPageState> {
  public render() {
    return (
      <div className="url-scraper-page">
        <DefaultNavbar title="URL Scraper" />
        <UrlScraperPanel />
      </div>
    );
  }
}