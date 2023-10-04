import './index.scss';
import React from 'react';
import Navbar from './navbar/Navbar';

const App = (): JSX.Element => {
  const hello: string = 'Hello, Typescript';
  return (
    <>
      <Navbar />
    </>
  );
};

export default App;
