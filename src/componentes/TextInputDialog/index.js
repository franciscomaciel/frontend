import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Modal, Button, Row, Col, Form} from 'react-bootstrap';


export default class TextInputDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: this.props.texto,
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
                        {this.props.mensagem}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "#dddddd"}} className="p-3 m-3">
                    <Form.Group>
                        <Form.Control className="mt-3" type="text" maxLength="120" id="texo"
                                      name="texto"
                                      onChange={e => this.setState({texto: e.target.value})}
                                      placeholder={this.props.texto}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.props.onHideSuccess}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
