import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter } from 'react-router-dom';

const start = (): void => {
  ReactDOM.render(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </>,
    document.querySelector('#root')
  );
};

start();
