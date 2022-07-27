import NumberFormat from "react-number-format";
import {Button} from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import DetalhesPedido from "../DetalhesPedido";
import React from "react";
import SearchBar from "../BarraPesquisa";
import Keycloak  from "keycloak-js";
import { useKeycloak } from "@react-keycloak/web";

export default class ListaPedidos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carregando: true,
            pedidos: [],
            mostrarDetalhesPedido: false,
            pedidoSelecionado: null,
            exibirMensagem: false,
            mensagem: "",
            filialSelecionada: "",
            keycloak: null,
            authenticated: false,
            usuarioConectado:null
        }
        this.getUsuarioConectado = this.getUsuarioConectado.bind(this);
        this.fecharModalDetalhesCancelar = this.fecharModalDetalhesCancelar.bind(this);
        this.fecharModalDetalhesSucesso = this.fecharModalDetalhesSucesso.bind(this);
        this.formatarData = this.formatarData.bind(this);
        this.renderPedido = this.renderPedido.bind(this);
        // this.renderDetalhesPedido = this.renderDetalhesPedido.bind(this);
        this.detalhesBloqueioClickHandler = this.detalhesBloqueioClickHandler.bind(this);
        this.setFiltro = this.setFiltro.bind(this);
    }

    setFiltro(value) {
        this.setState({ filialSelecionada: value });
    }

    getUsuarioConectado = () => {
        if(this.state.usuarioConectado)
            return this.state?.usuarioConectado?.preferred_username;
        else
            return "Usuário ainda não se conectou.";  // Substituir por código para obter o usuário atualmente conectado
    }

    fecharModalDetalhesCancelar = () => {
        this.setState(
            {
                mostrarDetalhesPedido: false,
                exibirMensagem: false,
                mensagem: "",
            });
    }

    fecharModalDetalhesSucesso = () => {
        this.setState(
            {
                mostrarDetalhesPedido: false,
                exibirMensagem: true,
                mensagem: "Pedido desbloqueado com sucesso.",
            });
        alert("Pedido desbloqueado com sucesso.");
        window.location.reload();
    }

    formatarData = (data) => {
        let dummy = new Date(data);
        let dataFormatada = dummy.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        return dataFormatada;
    }

    selecionarPedidoParaExibirDetalhes = (pedido) => {
        if (pedido !== null) {
            this.setState({
                    pedidoSelecionado: pedido,
                    mostrarDetalhesPedido: true
                }
            );
        }
        ;
    }

    detalhesBloqueioClickHandler = (pedido) => this.selecionarPedidoParaExibirDetalhes(pedido);

    async componentDidMount() {
        const keycloak = new Keycloak('keycloak.json');
        const backend_url = process.env.REACT_APP_CONNECTOR_BACKEND_URL;
        const url = `${backend_url}/pedidos-bloqueados/`;
        // ----------------- Inicialização do Keycloak -------------------
        keycloak.init({ onLoad: 'login-required'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated});
            if(authenticated) {
                localStorage.accessToken = keycloak.token;
                keycloak.loadUserInfo().then(userInfo => {
                    this.setState({usuarioConectado : userInfo});
                });
            }
        });

        // ----------------- Até aqui ------------------------------------
        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(d => {
                this.setState({pedidos: [d], carregando: false});
            })
            .catch(error => console.log(error));
        const response = await fetch(url);
        const dummy = await response.json();
        const data = JSON.parse(dummy);
        // Pegar o primeiro pedido da lista e armazenar em pedidoSelecionado:
        this.setState({pedidos: data, pedidoSelecionado: (data[0] ? data[0] : null)});
    }

    // PARA O FILTRO FUNCIONAR !!!!!!!! *!*
    renderPedido = (pedido, indice) => {
        // const result = pedido.filial == "04" ?
        // const result = this.props.filialSelecionada && pedido.filial === this.props.filialSelecionada ?
        const result =
            (
                <>
                    <article className="listagem-artigos mb-3 p-3" key={indice}>
                        Vendedor: <span className="font-weight-bold">{pedido.vendedor}</span> <br/>
                        Cliente: <span className="font-weight-bold">{pedido.cliente}</span> <br/>
                        Filial: <span className="font-weight-bold">{pedido.filial}</span> - Pedido Número: <span
                        className="font-weight-bold"> {pedido.pedido} </span><br/>
                        Valor: <span className="font-weight-bold"><NumberFormat value={pedido.valor}
                                                                                displayType={'text'}
                                                                                thousandSeparator={'.'}
                                                                                decimalSeparator={','} prefix={'R$ '}
                                                                                decimalScale={2}
                                                                                fixedDecimalScale={true}/>
                            </span><br/>
                        Emissão: <span className="font-weight-bold">{this.formatarData(pedido.emissao)} </span> -
                        Entrada: <span className="font-weight-bold">{this.formatarData(pedido.entrada)}</span> <br/>
                        Bloqueios:
                        <Button data-tip data-for="detalhesBloqueioTip" className="bg-danger"
                                onClick={(evt) => {
                                    this.detalhesBloqueioClickHandler(pedido)
                                }}>{(pedido?.motivobloqueio?.trim())?.slice(0, -1)}
                        </Button><br/>
                        <ReactTooltip id="detalhesBloqueioTip" place="top" effect="solid">Clique para ver os detalhes do
                            bloqueio.</ReactTooltip>
                    </article>
                </>
            );
            // :
            // (
            //     <>
                    {/*<article className="listagem-artigos mb-3 p-3" key={indice}>*/}
                    {/*    Vendedor: <span className="font-weight-bold">{pedido.vendedor}</span> <br/>*/}
                    {/*    Cliente: <span className="font-weight-bold">{pedido.cliente}</span> <br/>*/}
                    {/*    Filial: <span className="font-weight-bold">{pedido.filial}</span> - Pedido Número: <span*/}
                    {/*    className="font-weight-bold"> {pedido.pedido} </span><br/>*/}
                    {/*    Valor: <span className="font-weight-bold"><NumberFormat value={pedido.valor}*/}
                    {/*                                                            displayType={'text'}*/}
                    {/*                                                            thousandSeparator={'.'}*/}
                    {/*                                                            decimalSeparator={','} prefix={'R$ '}*/}
                    {/*                                                            decimalScale={2}*/}
                    {/*                                                            fixedDecimalScale={true}/>*/}
                    {/*        </span><br/>*/}
                    {/*    Emissão: <span className="font-weight-bold">{this.formatarData(pedido.emissao)} </span> -*/}
                    {/*    Entrada: <span className="font-weight-bold">{this.formatarData(pedido.entrada)}</span> <br/>*/}
                    {/*    Bloqueios:*/}
                    {/*    <Button data-tip data-for="detalhesBloqueioTip" className="bg-danger"*/}
                    {/*            onClick={(evt) => {*/}
                    {/*                this.detalhesBloqueioClickHandler(pedido)*/}
                    {/*            }}>{(pedido?.motivobloqueio?.trim())?.slice(0, -1)}*/}
                    {/*    </Button><br/>*/}
                    {/*    <ReactTooltip id="detalhesBloqueioTip" place="top" effect="solid">Clique para ver os detalhes do*/}
                    {/*        bloqueio.</ReactTooltip>*/}
                    {/*</article>*/}
            //     </>
            // )
        // ;
        // : null;
        return result;
    }

    /*
        renderDetalhesPedido = (pedido) => {
            return(
                <div>
                    <h1>Itens do Pedido aqui &lt; ListaPedidos &gt; :</h1>
                    <p>
                        { pedido?.pedidofilial } <br/>
                        { pedido?.filial } <br/>
                        { pedido?.valor } <br/>
                    </p>
                </div>
            );
        }
    */
    render() {
        const listaPedidos = this.state.pedidos;
        let result;
        if (this.state.keycloak) {
            if(this.state.authenticated) {
                if (listaPedidos !== "[]") {
                    result = (
                        <>
                            <SearchBar setter={this.setFiltro.bind(this)} />
                            {
                                (listaPedidos.map((pedido, index) => (listaPedidos[index]))).map((this.renderPedido))
                            }
                            {
                                this.state.mostrarDetalhesPedido && this.state.pedidoSelecionado &&
                                <DetalhesPedido
                                    show={this.state.mostrarDetalhesPedido}
                                    pedido={this.state.pedidoSelecionado}
                                    onHideSuccess={this.fecharModalDetalhesSucesso}
                                    onHideCancel={this.fecharModalDetalhesCancelar}
                                    usuario={this.getUsuarioConectado()}
                                />
                            }
                        </>
                    );
                } else {
                    result = (
                        <span className="h1 text-danger">Nenhum pedido bloqueado atualmente.</span>
                    );
                }
            } else {
                result = (
                    <span className="h1 text-danger">Usuário não autorizado</span>
                );
            }
        } else {
            result = (
                <span className="h1 text-danger">Inicializando subsistema de controle de acesso...</span>
            );
        }
        return (
            <div className="app">
                {result}
            </div>
        );
    }
}
