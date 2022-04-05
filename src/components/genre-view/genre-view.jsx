import React from 'react';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import '../director-view/director-view.scss';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
        return (
            <>
                <Container fluid>
                    <Row className="m-3 mx-auto h-1">
                        <Col>
                            <CardGroup>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{genre.Name}</Card.Title>
                                        <Card.Text>{genre.Description}</Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                            <Button onClick={() => { onBackClick() }}>Back</Button>
                        </Col>
                    </Row>
                    
                </Container>
            </>)
    }
}
