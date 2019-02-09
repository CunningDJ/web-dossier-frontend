import * as React from 'react';
import { Link } from 'react-router-dom';

import './DefaultNavbar.css';

import logo from '../../assets/logo/web-dossier-logo.png';

export interface IDefaultNavbarProps {
    title: string;
}

export interface IDefaultNavbarState {}

export default class DefaultNavbar extends React.Component<IDefaultNavbarProps, IDefaultNavbarState> {
    public render() {
      return (
        <header className="default-navbar">
          <Link to="/"><img src={logo} className="default-navbar__logo" alt="Web Dossier" /></Link>
          <h1 className="default-navbar__title">{this.props.title}</h1>
        </header>
      )
    }
}
