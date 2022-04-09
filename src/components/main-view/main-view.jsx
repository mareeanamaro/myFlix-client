import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Redirect } from 'react-router-dom'; 
import { Menubar } from '../nav-bar/nav-bar';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import '../main-view/main-view.scss';

class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
            ],
            users: [],
            user: null
        }
        this.onLoggedIn = this.onLoggedIn.bind(this);

    }

    getMovies(token) {
        axios.get('https://flicking-through-flicks.herokuapp.com/movies',
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });
        console.log(authData);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegistration(authData) {
        this.setState({
            user: authData.user.Username
        });
    }


    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(token);
        }
    }

    render() {
        const { movies, user } = this.state;


        return (
            <Router>
                <Menubar user= {user}/>
                <Container>
                    <Row className="main-view justify-content-md-center">

                        {/* show all movies */}
                        <Route exact path="/" render={() => {

                            if (!user) return (
                                <Col md={10}>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>)

                            if (movies.length === 0) return <div className="main-view" />;

                            return movies.map(movie => (
                                <Col className="align-items-space-around d-flex mb-3" md={6} lg={3} key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))
                        }} />
                        {/* show registration view */}
                        <Route path="/register" render={() => {
                            if(user) return <Redirect to ="/"/>
                            return <Col>
                                <RegistrationView onLoggedIn={this.onLoggedIn} />
                            </Col>
                        }} />
                        {/* show login view */}
                        <Route path="/login" render={() => {
                            return <Col>
                                <LoginView />
                            </Col>
                        }} />
                        {/* show profile view */}
                        <Route path ="/profile"
                        render={({ user, history }) => {
                            return <Col>
                                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }}/>
                        
                        {/* show selected movie */}
                        <Route exact path="/movies/:movieID" render={({ match, history }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieID)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        {/* show selected genre */}
                        <Route exact path="/genres/:name"
                            render={({ match, history }) => {
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                        {/* show selected director */}
                        < Route exact path="/directors/:name"
                            render={({ match, history }) => {
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={12}>
                                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                    </Row>
                </Container>
            </Router>

        );
    }
}

export default MainView;