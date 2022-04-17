import React from 'react';
import { Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import '../director-view/director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;
        return (
            <>
                <Container fluid>
                    <Row className="m-3 mx-auto h-1">
                        <Col>
                            <CardGroup>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{director.Name}</Card.Title>
                                        <Card.Text>{director.Bio}</Card.Text>
                                        <Card.Text><span className="label">Born:</span> {director.Birth}</Card.Text>
                                        <Card.Text><span className="label">Died:</span> {director.Death}</Card.Text>
                                        
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
