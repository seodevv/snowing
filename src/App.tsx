import './index.scss';
import React from 'react';
import Navbar from './navbar/Navbar';
import MainPage from './pages/main/MainPage';

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <MainPage />
    </>
  );
};

export default App;
