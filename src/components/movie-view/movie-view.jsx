import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
            <div className="movie-poster"><img  alt={movie.title} height="400" crossOrigin="anonymous" src={movie.ImagePath} /></div>
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
            </div>
            <button onClick={() => { onBackClick(null);}}>Back</button>
            </div>);
        
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
