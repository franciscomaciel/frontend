import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';


export default class Mensagem extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     texto: "",
        // }
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
                    {this.props.texto}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.props.onHideSuccess}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
