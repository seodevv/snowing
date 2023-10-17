import './index.scss';
import React from 'react';
import Navbar from './navbar/Navbar';
import MainPage from './pages/main/MainPage';
import { useSelector } from 'react-redux';
import {
  selectFeed,
  selectNewsletter,
  selectSelector,
  selectSignup,
} from './app/slice';
import Feed from './components/Feed';
import Footer from './components/Footer';
import Newletter from './components/Newsletter';
import { useGetSecretQuery, useGetUserInfoQuery } from './app/apiSlice';
import Signup from './pages/sign/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = (): JSX.Element => {
  useGetSecretQuery();
  useGetUserInfoQuery();
  const selector = useSelector(selectSelector);
  const feed = useSelector(selectFeed);
  const signup = useSelector(selectSignup);
  const newsletter = useSelector(selectNewsletter);

  return (
    <>
      <GoogleOAuthProvider clientId="27098361849-kapr63d6bofbchj8tvtlf8bcn46ffikh.apps.googleusercontent.com">
        <Navbar />
        {selector === 'main' && <MainPage />}
        <Footer />
        {feed.flag && <Feed feed={feed} />}
        {newsletter.flag && <Newletter email={newsletter.email} />}
        {signup.flag && <Signup />}
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
