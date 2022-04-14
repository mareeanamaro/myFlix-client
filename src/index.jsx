import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';
import './index.scss';

const myFlixStore = createStore(moviesApp, devToolsEnhancer());

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