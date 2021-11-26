import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './application/js/Store.js';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

if(module.hot){
  module.hot.accept();
}
