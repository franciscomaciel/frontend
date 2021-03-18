import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';


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
        let dummy = new Date(data);
        let dia = ("0" + dummy.getDate()).slice(-2);
        let mes = ("0" + dummy.getMonth() + 1).slice(-2);
        let ano = dummy.getFullYear();
        let result = dia + '/' + mes + '/' + ano;
        return result;
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
