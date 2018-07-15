/** @format */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Fancy } from './src/Fancy'
import { Reddit } from './src/Reddit'
import { Provider } from 'react-redux';
import { store } from './src/store';

// const Main = () => (
//   <Provider><App /></Provider>
// )

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// AppRegistry.registerComponent(appName, App);
AppRegistry.registerComponent(appName, () => Main);