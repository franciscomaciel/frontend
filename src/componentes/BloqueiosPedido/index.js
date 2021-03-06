import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { api } from '../../services/api';


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

    exibirCaixaDialogoMotivoDesbloqueio = (sequenciaItemBloqueio) => {
        Dialog.setOptions({'defaultCancelLabel': 'Cancelar'});
        this.dialog.show({
            body: 'Justificativa para o desbloqueio:',
            prompt: Dialog.TextPrompt({placeholder: 'Entre com a justificativa', required: true}),
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction((dialog) => {
                    const justificativa = dialog.value;
                    this.desbloquearItemPedido(sequenciaItemBloqueio, justificativa);
                    window.location.reload(false);    // *!* TESTE
                })
            ]
        });
    }

    desbloquearItemPedido = (sequencia, justificativa) => {
        const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
        // const url = `${backend_url}/desbloquear-item-pedido/`;
        const url = '/desbloquear-item-pedido/';
        const dadosLiberacao = {
            numero_pedido_filial: this.state?.pedido?.pedidofilial,
            codigo_usuario_liberador: this.state?.usuarioLiberador,
            justificativa: justificativa,
            sequencia: sequencia
        };
        async function fetchData() {
            // await api.post(url, dadosLiberacao)
            //     .then(response => {
            //         if(response.ok) {
            //             this.setState({ bloqueiosPedido: [response.data] });
            //         }})
            //     .catch( err => console.log(err) );
            try {
                const response = await api.post(url, dadosLiberacao);
                this.setState({ bloqueiosPedido: [response.data] });
            } catch(err) {
                console.log(err);
            }

        }
        fetchData();
    }

    renderBloqueioPedido = (bloqueio, sequencia) => {
        return (
            <>
                <Row key={sequencia}>
                    <Col sm> Data: <span className="font-weight-bold sm">{this.ajustarData(bloqueio.dt_inclusao)}</span> </Col>
                    <Col sm> Motivo: <span className="font-weight-bold sm">{bloqueio.ds_motivo}</span> </Col>
                    <Col sm> SEQU??NCIA: <span className="font-weight-bold sm">{bloqueio.sequencia}</span> </Col>
                    <Col sm> <Button variant="success"
                                     onClick={
                                         ()=> this.exibirCaixaDialogoMotivoDesbloqueio(bloqueio.sequencia)
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
