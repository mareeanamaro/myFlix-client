import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser, setUserObject, profileUpdate } from '../../actions/actions';


import UserInfo from './user-info';
import FavMovies from './favorite-movies';
import UpdateInfo from './update-user';

import { Button, Container, Row, Col } from 'react-bootstrap';
import './profile-view.scss';

class ProfileView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.setUser({
        user: localStorage.getItem('user')
      });
      this.getUserData(token);
    }
  }


  // get the user data to display
  getUserData = (token) => {
    let Username = localStorage.getItem('user');
    console.log(Username);
    axios.get(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUserObject({
          Username: response.data.Username,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // function to delete the user 
  deleteUser(e) {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    e.preventDefault;
    axios.delete(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {

        localStorage.removeItem('token'),
          localStorage.removeItem('token'),
          alert('User deleted');
        window.open('/', '_self');

      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {

    const { movies } = this.props;
    const { Username, Email, Birthday, FavoriteMovies } = this.props.userObject;

    if (!Username) {
      return null;
    }

    return (
      <>
        <Container>
          <UserInfo username={Username} email={Email} birthday={Birthday} />
          <UpdateInfo userObject={this.props.userObject} changeHandler={this.props.setUserObject} updateUserData={() => this.props.profileUpdate({
            Username: this.props.userObject.Username,
            Password: this.props.userObject.Password,
            Email: this.props.userObject.Email,
            Birthday: this.props.userObject.Birthday
          })} />
          <FavMovies movies={movies} favoriteMovieList={FavoriteMovies} removeFav={this.removeFav} />
          <Row className="m-2 mx-auto">
            <Col>
              <div>Here lies danger!</div>
              <Button variant="danger" onClick={(e) => this.deleteUser(e)}>Delete your account</Button></Col></Row>
        </Container>
      </>

    )
  }

}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.userObject.Username,
    userObject: state.userObject
  }
}

export default connect(mapStateToProps, { setUser, setUserObject, profileUpdate })(ProfileView);