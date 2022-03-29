import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col , CardGroup, Card} from 'react-bootstrap';
import '../movie-view/movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
           <>
             <Container>  
    <Row className= "m-3 mx-auto h-1">
    <Col>
    <CardGroup>
        <Card>

         <Card.Img src={movie.ImagePath}/>
            <Card.Body>
             <Card.Title>{movie.Title}</Card.Title>
            <Card.Subtitle>{movie.Director.Name}, {movie.Release}</Card.Subtitle>
           <p></p>
          <Card.Text>{movie.Description}
          </Card.Text>
          <Card.Text>{movie.Genre.Name}
          </Card.Text>
          
          </Card.Body>
    

            </Card>
</CardGroup>
<Button onClick={() => { onBackClick(null);}}>Back</Button>
</Col>

</Row> 
</Container>
        </>)
    }
}

MovieView.PropTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }), 
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
            Birth: PropTypes.number,
            Death: PropTypes.number
        }),
        ImagePath: PropTypes.string,
        Featured: PropTypes.bool,
        Release: PropTypes.number
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
