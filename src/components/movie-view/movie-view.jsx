import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../movie-view/movie-view.scss';

export class MovieView extends React.Component {

    addFav = (e, movie) => {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

       e.preventDefault;
       console.log(token);

       if (token && Username) { 
       if (token) {
        axios.patch(`https://flicking-through-flicks.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Movie added to your favorites.');
                window.open('/profile', '_self');
            })
            .catch(function (error) {
                console.log(error)
            })
    }}
}
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <>
                <Container>
                <Card>
                    <Row className="g-0 mx-auto">
                        <Col className="md-4">

                                <Card.Img className="m-10" src={movie.ImagePath}/>
                                </Col>
                                <Col className="md-8">
                                <Card.Body className="m-10">
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Subtitle><Link className="open-link" to={`/directors/${movie.Director.Name}`} >{ }{movie.Director.Name}</Link>, {movie.Release}</Card.Subtitle>
                                    <p></p>
                                    <Card.Text>{movie.Description}
                                    </Card.Text>
                                    <Card.Text><Link className="open-link" to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}
                                    </Link></Card.Text>
                                    <Card.Text>
                                        {/* need to fix CORS issue */}
                                        <Button className="buttons-movie" value={movie._id} onClick={(e) => this.addFav(e, movie)}>Add to Favorite Movies</Button>
                                    </Card.Text>
                                </Card.Body>
                           
                           
                        </Col>
                    </Row>
                    </Card>
                    <Button className="buttons-movie" onClick={() => { onBackClick() }}>Back</Button>
                </Container>
            </>)
    }
}

MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};