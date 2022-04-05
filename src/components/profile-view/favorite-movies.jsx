import React from "react";
import { Link } from 'react-router-dom';

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';

function FavMovies({ favoriteMovieList }) {

    return (

        <>
        <Row className="m-2 mx-auto">
            <Col className="align-items-space-around d-flex mb-3" md={6} lg={6}>
                {favoriteMovieList.map((movie) => {
                    return (
                        <Card className='card' key={movie._id}>
                            <Card.Img src={movie.ImagePath} />
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button className="open-link" variant="link">Open</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Col>
        </Row>
    </>
);
}

export default FavMovies;