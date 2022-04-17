import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

// components
import { Menubar } from '../nav-bar/nav-bar';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import '../main-view/main-view.scss';

class MainView extends React.Component {

    constructor() {
        super();
        this.onLoggedIn = this.onLoggedIn.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.setUser({
                user: localStorage.getItem('user')
            });
            this.getMovies(token);
        }
    }

    onLoggedIn(authData) {
        this.props.setUser({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        
        this.getMovies(authData.token);
    }

    onRegistration(authData) {
        this.props.setUser({
            user: authData.user.Username
        });
    }

    getMovies(token) {
        axios.get('https://flicking-through-flicks.herokuapp.com/movies',
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        let { movies } = this.props;

        let user = localStorage.getItem('user');
        console.log(user);

        return (
            <Router>
                <Menubar user= {user}/>
        
                <Container>
                    <Row className="main-view justify-content-md-center">

                        {/* show all movies */}
                        <Route exact path="/" render={() => {
                    
                            if (!user) return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>)

                            if (movies.length === 0) return <div className="main-view" />;

                            return <MoviesList movies={movies}/>;
                           

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
                                <LoginView onLoggedIn={this.onLoggedIn}/>
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
                            return <Col>
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

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user.Username
    }
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);