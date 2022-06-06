import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchHeader = styled.div`
    margin-top: 4px;
`;

export  default  function SearchBar(props) {

    const [ filialSelecionada, setFilialSelecionada ] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        let filialSelecionada = evt.target.value;  //         let filialSelecionada = evt.target[0].value;
        this.props.setter(filialSelecionada);
    }

    function handleSearchChange(evt) {
        setFilialSelecionada(evt.target.value);
    }

    return (
        <SearchHeader>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col className="col-xl-3">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Filtrar por filial"
                                aria-label="Filtrar por filial"
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Append>
                                <Button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Row>
            </Form>
        </SearchHeader>
    );
}