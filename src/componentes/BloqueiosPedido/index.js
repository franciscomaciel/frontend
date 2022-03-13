import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import exit from "exit";


export default class BloqueiosPedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuarioLiberador: props.usuario,
            pedido: props.pedido,
            bloqueiosPedido: [],
        }
    }

    async componentDidMount() {
        const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
        const url = `${backend_url}/get-bloqueios-pedido/${this.props.pedido.pedidofilial}`;
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        this.setState({bloqueiosPedido: data});
    }

    ajustarData = (data) => {
        let dummy  = new Date(data);
        return dummy.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    }

    exibirCaixaDialogoMotivoDesbloqueio = (indiceItemBloqueio) => {
        Dialog.setOptions({'defaultCancelLabel': 'Cancelar'});
        this.dialog.show({
            body: 'Justificativa para o desbloqueio:',
            prompt: Dialog.TextPrompt({placeholder: 'Entre com a justificativa', required: true}),
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction((dialog) => {
                    const justificativa = dialog.value;
                    this.desbloquearItemPedido(indiceItemBloqueio, justificativa);
                    window.location.reload(false);    // *!* TESTE
                })
            ]
        });
    }

    desbloquearItemPedido = (indiceItem, justificativa) => {
        const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
        const url = `${backend_url}/desbloquear-item-pedido/`;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                numero_pedido_filial: this.state?.pedido?.pedidofilial,
                codigo_usuario_liberador: this.state?.usuarioLiberador,
                justificativa: justificativa,
                item_bloqueio: indiceItem
            })
        };
        // *!* RECEBE *TODOS OS DADOS CORRETAMENTE*; PROBLEMA É NA CHAMADA (POST) DE DESBLOQUEAR-ITEM-PEDIDO.
        fetch(url, requestOptions)
            .then(response => {
                console.log('Recebeu o JSON: ' + response.json());
                return response.json();
            })
            .catch( (error) => {
                alert('Erro: ' + error.message);
            });
        //     .then(data => {
        //         console.log('Setou os dados: ' + data);
        //         this.setState({ bloqueiosPedido: data });
        //     })
        //     .catch(error => console.log(error));
    }

    renderBloqueioPedido = (bloqueio, indice) => {
        return (
            <>
                <Row key={indice}>
                    <Col sm> Data: <span className="font-weight-bold sm">{this.ajustarData(bloqueio.dt_inclusao)}</span> </Col>
                    <Col sm> Motivo: <span className="font-weight-bold sm">{bloqueio.ds_motivo}</span> </Col>
                    <Col sm> <Button variant="success" disabled={false && !this.state.isUsuarioAutorizado}
                                     onClick={
                                         ()=> this.exibirCaixaDialogoMotivoDesbloqueio(bloqueio.item_motivo)  // this.desbloquearItemPedido(bloqueio.item_motivo)
                                     }
                            >
                                    Desbloquear
                            </Button>
                    </Col>
                    <Dialog ref={(component) => { this.dialog = component }} />
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
