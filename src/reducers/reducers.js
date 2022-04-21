import { combineReducers } from "redux";

import { SET_MOVIES, SET_FILTER, SET_USER, SET_USER_OBJECT, UPDATE_USER } from "../actions/actions";

function movies(state = [], action) {
    switch(action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
  switch (action.type) {
      case SET_USER:
          return action.value;
      default:
          return state;
  }
}


function userObject(state = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []}, action) {
    switch (action.type) {
        case SET_USER_OBJECT:
            return action.value;
        default:
            return state;
    }
}

function updateUser(value = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []}, action) {
    const { field } = action;
    switch (action.type) {
            case UPDATE_USER:
                return {
                    ...userObject,
                    [field]: value
                };
        default:
            return value;
    }
}


const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user, 
    userObject,
    updateUser
});

export default moviesApp;