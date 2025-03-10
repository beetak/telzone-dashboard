import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function.
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();