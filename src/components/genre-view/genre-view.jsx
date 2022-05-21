import React from 'react';
import propTypes from 'prop-types';
import { Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import '../genre-view/genre-view.scss';

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
                            <Button className='buttons-genre' onClick={() => { onBackClick() }}>Back</Button>
                        </Col>
                    </Row>
                    
                </Container>
            </>)
    }
}

GenreView.proptypes = {
    Genre: propTypes.shape({
      Name: propTypes.string,
      Description: propTypes.string
    }).isRequired,
  };