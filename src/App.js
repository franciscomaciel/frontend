import React from 'react';
import ListaPedidos from './componentes/ListaPedidos';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import BarraPesquisa from './componentes/BarraPesquisa';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filtro: "",
        }
        this.setFiltro = this.setFiltro.bind(this);
    }

    setFiltro(value) {
        this.setState({
            filtro: value
        });
    }

    render() {
        return (
            <div>
                {/*<BarraPesquisa setter={this.setFiltro}/>*/}
                <ListaPedidos filtro={this.state.filtro}/>
            </div>
        );
    }
}
