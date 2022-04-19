import React from 'react';
import { Col } from 'react-bootstrap';
import { connect} from 'react-redux';
import MainView from '../main-view/main-view';

import  VisibilityFilterInput  from '../visibility-filter/visibility-filter';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return {visibilityFilter};
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '' ) {
        filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <MainView />

    return(
    <>
    <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
    {filteredMovies.map(movie =>
        (<Col className="align-items-space-around d-flex mb-3" md={6} lg={3} key={movie._id}>
            <MovieCard movie = {movie} />
        </Col>))}
        </>);
}

export default connect(mapStateToProps) (MoviesList);