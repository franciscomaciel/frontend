import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';
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
        const url = `http://localhost:8000/get-itens-pedido/${this.props.pedido.pedidofilial}`;
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        this.setState({itensPedido: data});
    }

    // renderItemPedido = (itemPedido, indice) => {
    //     return (
    //         <>
    //             <Row key={indice}>
    //                 ITEM_PEDIDO: {JSON.stringify(itemPedido)}
    //                 {/*<Col sm> Data: <span className="text-bold sm">{JSON.stringify(itemPedido)}</span> </Col>*/}
    //                 {/*<Col sm> Motivo: <span className="text-bold sm">{itemPedido.ds_motivo}</span> </Col>*/}
    //             </Row>
    //             <br/>
    //             <hr/>
    //         </>
    //     );
    // }

    renderItemPedido = (itemPedido, indice) => {
        return (
            <>
                <Row key={indice}>
                    <Row>
                        <Col sm> N° Item: <span className="text-bold sm">{itemPedido.nu_item}</span> </Col>
                        <Col sm> Descrição: <span className="text-bold sm">{itemPedido.codigo_produto} -
                            {itemPedido.descricao_produto}</span> </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col> QTD: <span className="text-bold">{itemPedido.quantidade}</span> </Col>
                        <Col> Volumes: <span className="text-bold">{itemPedido.volumes}</span> </Col>
                        <Col> Custo: <span className="text-bold"><NumberFormat value={itemPedido.custo_medio}
                                                                               displayType={'text'}
                                                                               thousandSeparator={'.'}
                                                                               decimalSeparator={','}
                                                                               prefix={'R$ '}
                                                                               decimalScale={2}
                                                                               fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="sm"> Valor Unit.: <span className="font-weight-bold"><NumberFormat
                            value={itemPedido.preco_unitario}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'R$ '}
                            decimalScale={2}
                            fixedDecimalScale={true}/></span>
                        </Col>
                        <Col> Vl.Item: <span className="font-weight-bold"><NumberFormat value={itemPedido.valor}
                                                                                        displayType={'text'}
                                                                                        thousandSeparator={'.'}
                                                                                        decimalSeparator={','}
                                                                                        prefix={'R$ '}
                                                                                        decimalScale={2}
                                                                                        fixedDecimalScale={true}/></span>
                        </Col>
                        <Col> %MB: <span className="font-weight-bold"><NumberFormat value={itemPedido.perc_mb}
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={'.'}
                                                                                    suffix={' %'}
                                                                                    decimalSeparator={','}
                                                                                    decimalScale={2}
                                                                                    fixedDecimalScale={true}/></span>
                        </Col>
                    </Row>
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

/*
NU_PEDIDO_FILIAL, NU_ITEM, CODIGO_PRODUTO, DESCRICAO_PRODUTO,  QUANTIDADE, PRECO_UNITARIO,  VOLUMES,  VALOR,
 CUSTO_MEDIO,  PERC_MB
 */
