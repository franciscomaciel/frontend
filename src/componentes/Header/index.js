import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import logo from "../../img/logo_coremal.jpeg";
import './estilo.css';

export default class Header extends Component {
  render() {
    return (
    <div className="container">
      <nav className="cabecalho navbar navbar-expand-lg bg-white text-danger mt-5 ml-0">
        <a href="http://www.coremal.com.br/" className="navbar-brand" >
          <img src={logo} alt="Logomarca da Coremal" />
        </a>
      </nav>
    </div>    
    );
  }
}
