import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
            ],
            selectedMovie: null, 
            user: null,
            registration: null
        }
    }

    componentDidMount() {
        axios.get('https://flicking-through-flicks.herokuapp.com/movies')
            .then(response => 
                {
                    this.setState({
                        movies: response.data
                    });
                })
            .catch(error => {
                console.log(error);
            });
    }


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onRegistration(registration) {
        this.setState(
            {registration});
    }

    onLoggedIn(user) {
        this.setState(
            {user}
        );
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if(!registration) return <RegistrationView onRegistration={ registration => this.onRegistration(registration)} />;

        if (!user) return <LoginView  onLoggedIn= { user => this.onLoggedIn(user)}/>;
        
        if (movies.length === 0) return <div className="main-view" />;
      
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