import React from 'react';
import propTypes from 'prop-types';
import { Button, Card, CardGroup } from 'react-bootstrap';
import '../movie-card/movie-card.scss'

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (

            <CardGroup>
                <Card className='card'>
                    <Card.Img src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button className="open-link" variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </CardGroup>
        );

    }
}

MovieCard.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        ImagePath: propTypes.string
    }).isRequired,
};
