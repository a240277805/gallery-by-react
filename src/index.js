import 'core-js/fn/object/assign';
import React from 'react';
// import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
//import App from './components/Main';
//import About from './components/tests/About.js';
import RouteConfig from './components/tests/test1.js';

import createStore from './stores/Store.js'
const store = createStore()
// Render the main component into the dom

import createBrowserHistory from 'history/createBrowserHistory';

const newHistory = createBrowserHistory();
ReactDOM.render(
  <Provider  store={store}>
    <Router history={newHistory}>
      {RouteConfig}
    </Router>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
