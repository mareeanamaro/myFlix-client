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
            shouldCreateAccount: false, 
            token: null
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.onRegistration = this.onRegistration.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
        axios.get('https://flicking-through-flicks.herokuapp.com/movies', 
        {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => 
                {
                    this.setState({
                        movies: response.data
                    });
                })
            .catch(error => {
                console.log(error);
            });
            this.setState({
                user: token
            })
    }
}


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(token, user) {
        localStorage.setItem('token', token);
        this.setState(
            {token, user}
        );
    }

    handleRegister() {
        this.setState({
            shouldCreateAccount: true
        });
    }

    onRegistration(token) {
        localStorage.setItem('token', token);
    }


    render() {
        const { movies, selectedMovie, user, shouldCreateAccount } = this.state;

        if(!user && shouldCreateAccount) {
            return < RegistrationView onRegistration={token => this.onRegistration(token)}/>;
        }

        if (!user) return <LoginView  onLoggedIn= { user => this.onLoggedIn(user)} handleRegister={this.handleRegister}/>;
        
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