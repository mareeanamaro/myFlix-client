
//define action types and store them in variables

import axios from "axios";

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USER_OBJECT = 'SET_USER_OBJECT';
export const UPDATE_USER = 'UPDATE_USER';

// action creators
export function setMovies(value) {
  return { 
    type: SET_MOVIES,
    value };
}

export function setFilter(value) {
  return { 
    type: SET_FILTER,
     value };
}

export function setUser(value) {
  return { 
    type: SET_USER,
     value };
}

export function setUserObject(value = {Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: []}) {
  return {
    type: SET_USER_OBJECT,
    value
  }
}

// export function updateUser(value = {Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] },
//   field = null) {
//   return {
//     type: UPDATE_USER,
//      value, field }
//   }

// action with the API call
  export const profileUpdate = profile => dispatch => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    delete profile.Password;

    return axios.put(`https://flicking-through-flicks.herokuapp.com/users/${Username}`,
    profile,
  {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => {
      localStorage.setItem('user', response.data.Username);
      alert('Profile update');
      dispatch(setUserObject(profile));
      
    });
  }