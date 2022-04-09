import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import { Button, Row, Col, Figure } from 'react-bootstrap';
import './profile-view.scss';

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
            <Row className="mx-auto w-100 p-3 mt-3"><h4>Favorite Movies</h4>
            </Row>
            <Row className="mx-auto w-100">

                {favoriteMovieList.map((movieID) => {
                    const [movie] = movies.filter(movie => movie._id === movieID);
                    return movie && (
                        <Col className="align-items-space-between d-flex md-3" md={6} lg={3} key={movie._id}>
                            <>
                                <Figure>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Figure.Image src={movie.ImagePath}
                                            alt={movie.Title} />
                                        <Figure.Caption>{movie.Title}</Figure.Caption>
                                    </Link>
                                    <Button variant="danger" value={movie._id} onClick={(e) => removeFav(e, movie)}>Remove</Button>
                                </Figure>

                            </>
                        </Col>

                    );
                })}
            </Row>
        </>
    );
}

export default FavMovies;