import React from 'react';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import ListaPedidos from './componentes/ListaPedidos';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ReactKeycloakProvider authClient={keycloak}>
                    <ListaPedidos />
                </ReactKeycloakProvider>
            </div>
        );
    }
}
