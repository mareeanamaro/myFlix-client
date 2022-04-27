import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';


import MainView from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';
import './index.scss';


const configureStore = (preloadedState) => {
  const store = createStore(
    moviesApp,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
    ),
  );

  return store;
};

// const myFlixStore = createStore(moviesApp, devToolsEnhancer());

const myFlixStore = configureStore();


// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      // the provider makes the story available to all components
      <Provider store={myFlixStore}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);