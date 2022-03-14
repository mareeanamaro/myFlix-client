import React from 'react';

import {MovieCard} from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Rear Window', Description: ' wheelchair-bound photographer spies on his neighbors from his Greenwich Village courtyard apartment window, and becomes convinced one of them has committed murder, despite the skepticism of his fashion-model girlfriend.', ImagePath: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2020/09/21125907/rear-window-poster.jpg'},
                {_id: 2, Title: 'Carol', Description: 'An aspiring photographer develops an intimate relationship with an older woman in 1950s New York.', ImagePath: 'https://m.media-amazon.com/images/I/812vy2Xw0RL._AC_UY436_FMwebp_QL65_.jpg'},
                {_id: 3, Title: 'Moulin Rouge!', Description: ' poor Bohemian poet in 1890s Paris falls for a beautiful courtesan and nightclub star whom a jealous duke covets.', ImagePath: 'https://3.bp.blogspot.com/-Q5uKEur2e8M/WJFkq9p88kI/AAAAAAAAVxU/ebr_VLzEibUi_BqW7tXx9okTJk92sYM2gCLcB/s1600/moulin-rouge-movie-poster.jpg'}
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">

          {selectedMovie
            ? <MovieView movie = {selectedMovie} onBackClick= {
                newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>

            : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
            }
          </div>
        );
      }
    }

export default MainView;