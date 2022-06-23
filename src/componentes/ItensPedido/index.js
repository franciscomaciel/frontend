import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col } from 'react-bootstrap';
import NumberFormat from "react-number-format";


export default class ItensPedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pedido: props.pedido,
            itensPedido: [],
        }
    }

    async componentDidMount() {
        const server_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL
        const url = `${server_url}/get-itens-pedido/${this.props?.pedido?.pedidofilial}`
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        this.setState({itensPedido: data});
    }

    renderItemPedido = (itemPedido, indice) => {
        return (
            <>
                    <Row>
                        <Col sm> Código: <span className="font-weight-bold sm"> {itemPedido.codigo_produto}</span> </Col>
                    </Row>
                    <Row>
                        <Col sm> Descrição:<br/>
                            <span className="font-weight-bold sm">{itemPedido.descricao_produto}</span>
                        </Col>
                    </Row>
                    <Row>
                        &nbsp;
                    </Row>
                    <Row>

                        <Col> QTD: <span className="font-weight-bold">{itemPedido.quantidade}</span> </Col>
                    </Row>
                    <Row>
                        <Col> Volumes: <span className="font-weight-bold">{itemPedido.volumes}</span> </Col>
                    </Row>
                    <Row>
                        <Col> Vl.Item: <span className="font-weight-bold"><NumberFormat value={itemPedido.valor}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={'.'}
                                                                                        decimalSeparator={','}
                                                                                        prefix={'R$ '}
                                                                                        decimalScale={2}
                                                                                        fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="sm"> Valor Unit.: <span className="font-weight-bold"><NumberFormat
                            value={itemPedido.preco_unitario}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'R$ '}
                            decimalScale={2}
                            fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col> Custo: <span className="font-weight-bold"><NumberFormat value={itemPedido.custo_medio}
                                                                               displayType={'text'}
                                                                               thousandSeparator={'.'}
                                                                               decimalSeparator={','}
                                                                               prefix={'R$ '}
                                                                               decimalScale={2}
                                                                               fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
                <Row>
                    <Col> Custo Reposição: <span className="font-weight-bold"> Custo repos. </span>
                    </Col>
                </Row>
                    <Row>
                        <Col> %MB: <span className="font-weight-bold"><NumberFormat value={itemPedido.perc_mb}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={'.'}
                                                                                    suffix={' %'}
                                                                                    decimalSeparator={','}
                                                                                    decimalScale={2}
                                                                                    fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col> %MB reposição: <span className="font-weight-bold"> %MB repos. </span>
                        </Col>
                    </Row>
                <hr/>
            </>
        );
    }

    render() {
        return (
            <Container fluid size="sm">
                {(this.state.itensPedido.map((itemPedido, indice) => (this.state.itensPedido[indice])))
                    .map((this.renderItemPedido))}
            </Container>
        );
    }
}
