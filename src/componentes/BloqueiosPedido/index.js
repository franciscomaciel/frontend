import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';


export default class BloqueiosPedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pedido: props.pedido,
            bloqueiosPedido: [],
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8000/get-bloqueios-pedido/" + this.props.pedido.pedidofilial;
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        this.setState({bloqueiosPedido: data});
    }

    ajustarData = (data) => {
        let dummy  = new Date(data);
        return dummy.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }

    renderBloqueioPedido = (bloqueio, indice) => {
        return (
            <>
                <Row key={indice}>
                    <Col sm> Data: <span className="text-bold sm">{this.ajustarData(bloqueio.dt_inclusao)}</span> </Col>
                    <Col sm> Motivo: <span className="text-bold sm">{bloqueio.ds_motivo}</span> </Col>
                </Row>
                <br/>
                <hr/>
            </>
        );
    }

    render() {
        return (
            <Container fluid size="sm">
                {(this.state.bloqueiosPedido.map((bloqueio, indice) => (this.state.bloqueiosPedido[indice])))
                      .map((this.renderBloqueioPedido))}
            </Container>
        );
    }
}
