import React, {Component} from 'react';
import './navbar.css';
import logo from './logo.png';

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top nav-shop">
      <div className="container-fluid">
        <img src={logo} className="App-logo" alt="logo" />
          <a href="/" className="navbar-brand navbar-text padding-items">Etnik Shala</a>
        <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar9">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar9">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="services.html">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="portfolio.html">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="//codeply">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

export default Navbar;
