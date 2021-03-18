import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';


export default class Mensagem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            texto: props.texto,
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Mensagem:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "#dddddd"}} className="p-3 m-3">
                    { this.props.texto }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.props.onHideSuccess}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
