import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser, setUserObject, updateUser } from '../../actions/actions';


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
    axios.get(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUserObject({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // function to update user data
  updateUserData = (e) => {
    const token = localStorage.getItem('token');
    let Username = localStorage.getItem('user');
    
    e.preventDefault;
    axios.put(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        Username: this.props.updateUser.Username,
        Password: this.props.updateUser.Password,
        Email: this.props.updateUser.Email,
        Birthday: this.props.updateUser.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.props.updateUser({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        
        localStorage.setItem('user', response.data.Username);
        alert('Profile update');
      }
      )
      .catch(function (error) {
        console.log(error)
      })
  };

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

  // setUsername = (e) => {
  //   const { value } = e.target;
  //   this.props.updateUser({
  //     Username: value
  //   })
  // }

  // setPassword = (e) => {
  //   const { value } = e.target;
  //   this.props.updateUser({
  //     Password: value
  //   })
  // }

  // setEmail = (e) => {
  //   const { value } = e.target;
  //   this.props.updateUser({
  //     Email: value
  //   })
  // }

  // setBirthday = (e) => {
  //   const { value } = e.target;
  //   this.props.updateUser({
  //     Birthday: value
  //   })
  // }

  render() {


    const { movies } = this.props;
    const { Username, Email, Birthday, FavoriteMovies} = this.props.userObject;
    
    if (!Username) {
      return null;
    }

    return (
      <>
        <Container>
          <UserInfo username={Username} email={Email} birthday={Birthday}/>
          <UpdateInfo username={Username} setUsername={this.setUsername} setPassword={this.setPassword} setEmail={this.setEmail} setBirthday={this.setBirthday} updateUserData={this.updateUserData} />
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
    userObject: state.userObject }
}

export default connect(mapStateToProps, { setUser, setUserObject, updateUser })(ProfileView);