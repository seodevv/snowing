import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const start = (): void => {
  ReactDOM.render(
    <>
      <App />
    </>,
    document.querySelector('#root')
  );
};

start();
