import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';
import {Form, Button, Container, Row, Col , CardGroup, Card} from 'react-bootstrap';
import '../main-view/main-view.scss';

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
        this.handleLogOut = this.handleLogOut.bind(this);
        //this.handleLogin = this.handleLogin.bind(this);
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
        window.location.reload();
    }

    handleRegister() {
        this.setState({
            shouldCreateAccount: true
        });
    }

    /*handleLogin(){
        this.setState ({
            shouldCreateAccount: false,
            user: null
        });
        }*/

    handleLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
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
        <>
        <Row>
          {selectedMovie
            ? (
              <Row className="justify-content-md-center">
                <Col md={6}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              </Row>
            )
            : (
              <Row className="justify-content-md-around d-flex m-3">
                {movies.map(movie => (
                  <Col className="align-items-space-around d-flex mb-3" md={6} lg= {3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))}
                       <Button className="d-flex align-self-center" variant="danger" onClick={this.handleLogOut}>Log Out</Button>
              </Row>
            )
          }

        </Row>
        
        </>
      );
       
    
    }

    }

export default MainView;