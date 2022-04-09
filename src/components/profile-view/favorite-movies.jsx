import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';

function FavMovies({ favoriteMovieList, movies, removeFav }) {

    removeFav = (e, movie) => {
        let Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
      
          
        e.preventDefault;
      
        axios.delete(`https://flicking-through-flicks.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          alert('Movie deleted from your favorites.');
          window.open('/profile', '_self');
        })
        .catch(function (error) {
          console.log(error)
        })
      }


    return (

        <>
        <Row className="m-2 mx-auto">
            <Col className="align-items-space-around d-flex mb-3">
                {favoriteMovieList.map((movieID) => {
                    const [movie] = movies.filter(movie => movie._id === movieID);
                    return movie && (
                        <CardGroup>
                            <Card className='card' key={movie._id}>
                            <Card.Img src={movie.ImagePath} />
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button className="open-link" variant="link">More Details</Button>
                                </Link>
                                
                                    <Button variant="danger" value={movie._id} onClick={(e) => removeFav(e, movie) }>Remove from Favorites</Button>
                            
                
                            
                            </Card.Body>
                        </Card>
                        </CardGroup>
                    )
                })}
            </Col>
        </Row>
    </>
);
}

export default FavMovies;