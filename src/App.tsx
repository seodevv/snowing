import './index.scss';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import MainPage from './pages/main/MainPage';
import { useSelector } from 'react-redux';
import {
  selectCart,
  selectFeed,
  selectNewsletter,
  selectSignup,
} from './app/slice';
import Feed from './components/Feed';
import Footer from './components/Footer';
import Newletter from './components/Newsletter';
import { useGetSecretQuery, useGetUserInfoQuery } from './app/apiSlice';
import Signup from './pages/sign/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cart from './pages/cart/Cart';
import Product from './pages/product/Product';
import Shop from './pages/shop/Shop';
import New from './pages/new/New';
import Brands from './pages/brands/Brands';

const App = () => {
  useGetSecretQuery();
  useGetUserInfoQuery();
  const feed = useSelector(selectFeed);
  const signup = useSelector(selectSignup);
  const newsletter = useSelector(selectNewsletter);
  const cart = useSelector(selectCart);

  return (
    <>
      <GoogleOAuthProvider clientId="27098361849-kapr63d6bofbchj8tvtlf8bcn46ffikh.apps.googleusercontent.com">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product" element={<Outlet />}>
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/new" element={<New />} />
          <Route path="/brands" element={<Brands />}>
            <Route path=":name" element={<></>} />
          </Route>
          <Route path="/top" element={<></>}>
            <Route path=":subject" element={<></>} />
          </Route>
          <Route path="/bottom" element={<></>}>
            <Route path=":subject" element={<></>} />
          </Route>
          <Route path="/head" element={<></>}>
            <Route path=":subject" element={<></>} />
          </Route>
          <Route path="/acc" element={<></>}>
            <Route path=":subject" element={<></>} />
          </Route>
        </Routes>
        <Footer />
        {feed.flag && <Feed feed={feed} />}
        {newsletter.flag && <Newletter email={newsletter.email} />}
        {cart && <Cart />}
        {signup.flag && <Signup />}
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
