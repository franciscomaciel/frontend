import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';
import BloqueiosPedido from '../BloqueiosPedido';
import ItensPedido from '../ItensPedido';
import NumberFormat from "react-number-format";
import axios from 'axios';


export default class DetalhesPedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pedido: props.pedido,
            isUsuarioAutorizado: props.isUsuarioAutorizado,
            isListaPreenchida: false,
            usuario: props.usuario,
            justificativa: "",
            itensPedido: [],
        }
        this.desbloquearPedido = this.desbloquearPedido.bind(this);
    }

    async componentDidMount() {
        let pedido = this.props.pedido?.pedidofilial;
        const server_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL
        const url = `${server_url}/get-itens-pedido/${this.props?.pedido?.pedidofilial}`
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        this.setState({itensPedido: data, isListaPreenchida: (data.length > 0)});
    }

    formatarData = (data) => {
        let dummy  = new Date(data);
        let dataFormatada = dummy.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        return dataFormatada;
    }

    /*
    desbloquearPedido = (pedido) => {
        const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
        const url = `${backend_url}/desbloquear-pedido/?numero_pedido_filial=${pedido.pedidofilial}&justificativa=${this.state.justificativa}&codigo_usuario_liberador=${this.state.usuario}`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(d => {
                this.setState({pedidos: [d], carregando: false});
            })
            .catch(error => console.log(error));
    }
    */

    /*
        desbloquearPedido = (pedido) => {
            const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
            const url = `${backend_url}/desbloquear-pedido/`;
            const parametros = {
                "numero_pedido_filial": pedido.pedidofilial,
                "codigo_usuario_liberador": this.state.usuario,
                "justificativa": this.state.justificativa,
            };
            axios.post(url, { parametros }).then(res => {
                console.log(res);
                console.log(res.data);
            });

        }
*/
        desbloquearPedido = (pedido) => {
            const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
            const url = `${backend_url}/desbloquear-pedido/`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "numero_pedido_filial": pedido?.pedidofilial,
                    "codigo_usuario_liberador": this.state?.usuario,
                    "justificativa": this.state?.justificativa,
                })
            };
            fetch(url, requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(d => {
                    this.setState({ pedidos: [d], carregando: false });
                })
                .catch(error => console.log(error));
        }

    botaoDesbloquearHandler = () => {
        this.desbloquearPedido(this.state.pedido);
        this.props.onHideSuccess();
    }

    renderCabecalhoPedido = () => {
        let estiloBorda = {
            border: '1px solid #fff',
        };
        return (
            <>
                <Container fluid>
                    <Row>
                        <span style={estiloBorda}>CLIENTE:</span>
                        <span style={estiloBorda}>{this.state.pedido.cliente}</span>
                    </Row>
                    <Row>
                        <Col style={estiloBorda}>
                            VENDEDOR<br/>
                            PEDIDO<br/>
                            EMISSÃO<br/>
                            VALOR<br/>
                        </Col>
                        <Col style={estiloBorda}>
                            {this.state.pedido.vendedor}<br/>
                            {this.state.pedido.pedido}<br/>
                            {this.formatarData(this.state.pedido.emissao)}<br/>
                            <NumberFormat value={this.state.pedido.valor} displayType={'text'}
                                          thousandSeparator={'.'}
                                          decimalSeparator={','} prefix={'R$ '}
                                          decimalScale={2} fixedDecimalScale={true}/><br/>
                        </Col>
                        <Col style={estiloBorda}>
                            COMISSÃO<br/>
                            FILIAL<br/>
                            PRAZO<br/>
                            FRETE<br/>
                        </Col>
                        <Col style={estiloBorda}>
                            %%%<br/>
                            {this.state.pedido.filial}<br/>
                            XXX <br/>
                            <NumberFormat value={9999.99} displayType={'text'}
                                          thousandSeparator={'.'}
                                          decimalSeparator={','} prefix={'R$ '}
                                          decimalScale={2} fixedDecimalScale={true}/><br/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    corpoPedidoSelecionado() {
        return (
            <>
                <Container fluid size="sm">
                    <Row size="sm">
                        <Col size="sm" className="justify-content-start">
                            Cliente: <span className="font-weight-bold">{this.state.pedido && this.state.pedido.cliente}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="sm-2 justify-content-start">
                            Vendedor: <span className="font-weight-bold">{this.state.pedido && this.state.pedido.vendedor}</span><br/>
                            Pedido: <span className="font-weight-bold">{this.state.pedido.pedido}</span><br/>
                            Emissão: <span className="font-weight-bold justify-content-start">
                                                    {this.formatarData(this.state.pedido && this.state.pedido.emissao)}
                                         </span><br/>
                            Valor: <span className="font-weight-bold justify-content-start">
                                    <NumberFormat value={this.state.pedido.valor}
                                                  displayType={'text'}
                                                  thousandSeparator={'.'}
                                                  decimalSeparator={','}
                                                  prefix={'R$ '}
                                                  decimalScale={2}
                                                  fixedDecimalScale={true}/> </span>
                            <br/>
                        </Col>
                        <Col className="sm-4">
                            <span className="font-weight-bold justify-content-start"></span><br/>
                            <span className="font-weight-bold justify-content-start">
                                    {this.state.pedido.pedido}
                                </span> <br/>
                            Emissão:
                            Valor: <br/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="sm justify-content-center font-weight-bold">
                        ITENS DO PEDIDO:
                    </Row>
                    <ItensPedido pedido={this.state.pedido}/>
                    <hr/>
                </Container>
                {/*{(this.state.isListaPreenchida &&*/}
                {/*    (*/}
                {/*        this.state.itensPedido.map((itemPedido, indice) => (this.state.itensPedido[indice]))*/}
                {/*    )*/}
                {/*).map(this.renderItemPedido)}*/}
                <hr/>
                <Container fluid size="sm">
                    <Row className="sm justify-content-center font-weight-bold">
                        BLOQUEIOS DO PEDIDO:
                    </Row>
                    <BloqueiosPedido pedido={this.state.pedido} usuario={this.state?.usuario} />
                    <hr/>
                </Container>
                <Form.Group>
                    <Form.Control className="mt-3" type="text" maxLength="120" id="justificativa" name="justificativa"
                                  onChange={e => this.setState({justificativa: e.target.value})}
                                  placeholder="Informe a justificativa para o desbloqueio."/>
                </Form.Group>
            </>
        );
    }

    render() {
        const pedidoAtual = this.state.pedido;
        let result;
        if (pedidoAtual) {
            result =
                <>
                    { this.corpoPedidoSelecionado() }
                </>;
        } else {
            result =
                <>
                    <span className="h1 text-danger">Nenhum pedido bloqueado atualmente.</span>
                </>;
        }
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter text-danger">
                        Desbloquear pedido N° <span
                        className="text-bold text-danger">{this.state?.pedido?.pedido}</span> - Filial:
                        <span className="text-bold text-danger">{this.state?.pedido?.filial}</span> <br/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "#dddddd"}} className="p-3 m-3">
                    {result}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" disabled={!this.state.isUsuarioAutorizado}
                            onClick={this.botaoDesbloquearHandler}>Desbloquear Todos</Button>
                    <Button variant="danger" onClick={this.props.onHideCancel}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
