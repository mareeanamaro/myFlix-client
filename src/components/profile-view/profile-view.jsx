import React from 'react';
import axios from 'axios';

import { Form, Button, Container, Row, Col, CardGroup, Card, AccordionCollapse } from 'react-bootstrap';

import UserInfo from './user-info';
import FavMovies from './favorite-movies';
import UpdateInfo from './update-user';

export class ProfileView extends React.Component {

  // first initialise the state of the object
  constructor(props) {
    super(props);
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
  updateUserData = (e) => {
    const token = localStorage.getItem('token');
    let Username = localStorage.getItem('user');

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

setUsername = (e) => {
  const { value } = e.target;
  this.setState({
    Username: value
  })
}

setUsername = (e) => {
  const { value } = e.target;
  this.setState({
    Password: value
  })
}

setEmail(e) {
  const { value } = e.target;
  this.setState({
    Email: value
  })
}

setBirthday(e) {
  const { value } = e.target;
  this.setState({
    Birthday: value
  })
}

removeFav = (e) => {
  let Username = localStorage.getItem('user');
  const movies = this.state.FavoriteMovies;
  const token = localStorage.getItem('token');

  const [movie] = movies.filter(movie => movie._id === movieID);

  e.preventDefault;

  axios.delete(`https://flicking-through-flicks.herokuapp.com/users/${Username}/movies/${movie._id}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => {
    alert('Movie deleted from your favorites.');
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
    <FavMovies movies={this.props.movies} favoriteMovieList={FavoriteMovies} removeFav={this.removeFav}/>
    <UpdateInfo user={this.state} setUsername={this.setUsername} setPassword={this.setPassword} setEmail={this.setEmail} setBirthday={this.setBirthday} updateUserData={this.updateUserData}/>
    <Row className="m-2 mx-auto"><Col><Button variant="danger" onClick={(e) => this.deleteUser(e)}>Delete your account</Button></Col></Row>
    </Container>
    </>
      
  )
}

}
