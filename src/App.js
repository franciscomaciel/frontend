import React from 'react';
import ListaPedidos from './componentes/ListaPedidos';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ListaPedidos />
            </div>
        );
    }
}
