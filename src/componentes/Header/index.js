import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

import logo from "../../img/logo_coremal.jpeg";
import './estilo.css';

export default class Header extends Component {
  render() {
    return (
        <>
          <Navbar bg="light">
            <Container>
              <Navbar.Brand href="http://www.coremal.com.br/">
                  <img
                      src={logo}
                      width="80"
                      className="d-inline-block align-top"
                      alt="Logo Coremal"
                  /> {' '} Desbloqueio de pedidos
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
          <Navbar>
            <Container>
              <Navbar.Brand href="#home" >
                Usuário conectado: PERRELLI
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
    );
  }
}
