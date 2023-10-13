import './index.scss';
import React from 'react';
import Navbar from './navbar/Navbar';
import MainPage from './pages/main/MainPage';
import { useSelector } from 'react-redux';
import { selectFeed, selectNewsletter } from './app/slice';
import Feed from './components/Feed';
import Footer from './components/Footer';
import Newletter from './components/Newsletter';

const App = (): JSX.Element => {
  const feed = useSelector(selectFeed);
  const newsletter = useSelector(selectNewsletter);
  return (
    <>
      <Navbar />
      <MainPage />
      <Footer />
      {feed.flag && <Feed feed={feed} />}
      {newsletter.flag && <Newletter email={newsletter.email} />}
    </>
  );
};

export default App;
