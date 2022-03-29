import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import '../movie-card/movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
        
        <CardGroup>
        <Card className='card'>
        <Card.Img src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button className="open-link" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
      </CardGroup>
    );
        
        //<div className="movie-card" onClick={()=> {onMovieClick(movie); }}> {movie.Title} </div>
    }
}

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
