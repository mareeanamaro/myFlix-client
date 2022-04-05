import React from 'react';
import axios from 'axios';

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';

import UserInfo from './user-info';
import FavMovies from './favorite-movies';
import UpdateInfo from './update-user';

export class ProfileView extends React.Component {

  // first initialise the state of the object
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    }

    this.setState = this.setState.bind(this);
  }

  

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getUserData(token);
    }
}

  // get the user data to display
  getUserData(token) {
    let Username = localStorage.getItem('user');
    axios.get(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
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
  updateUserData(e) {
    e.preventDefault;
    axios.put(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) =>{
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });

        localStorage.setItem('user', this.state.Username);
        alert('Profile update');
        window.open('/profile', '_self');
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

setUsername(value) {
  this.setState({
    Username: value
  })
}

setPassword(value) {
  this.setState({
    Password: value
  })
}

setEmail(value) {
  this.setState({
    Email: value
  })
}

setBirthday(value) {
  this.setState({
    Birthday: value
  })
}

removeFav(id) {

  e.preventDefault;
  axios.delete(`https://flicking-through-flicks.herokuapp.com/users/${Username}/movies/${id}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => {
    alert('User deleted');
    window.open('/', '_self');
  })
  .catch(function (error) {
    console.log(error)
  })
}

render () {

  const {Username, Email, FavoriteMovies, setBirthday, setEmail, setPassword, setUsername, updateUserData} = this.state;

  if(!Username) {
    return null;
  }

  return (
    <>
    <Container>
    <UserInfo username = {Username} email = {Email} />
    <FavMovies favoriteMovieList={FavoriteMovies} removeFav={this.removeFav}/>
    <UpdateInfo setUsername={this.setUsername} setPassword={this.setPassword} setEmail={this.setEmail} setBirthday={this.setBirthday} updateUserData={this.updateUserData}/>
    <Row className="m-2 mx-auto"><Col><Button variant="danger" onClick={(e) => this.deleteUser(e)}>Delete your account</Button></Col></Row>
    </Container>
    </>
      
  )
}

}
