import './index.scss';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import MainPage from './pages/main/MainPage';
import { useSelector } from 'react-redux';
import {
  selectCart,
  selectFeed,
  selectModal,
  selectNewsletter,
  selectSignup,
  selectUser,
} from './app/slice';
import Feed from './components/Feed';
import Footer from './components/Footer';
import Newletter from './components/Newsletter';
import {
  useGetCartQuery,
  useGetSecretQuery,
  useGetUserInfoQuery,
} from './app/apiSlice';
import Signup from './pages/sign/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cart from './pages/cart/Cart';
import Product from './pages/product/Product';
import Shop from './pages/shop/Shop';
import New from './pages/new/New';
import Brands from './pages/brands/Brands';
import Category from './pages/category/Category';
import Contact from './pages/contact/Contact';
import My from './pages/my/My';
import Modal from './components/Modal';

const App = () => {
  const user = useSelector(selectUser);
  const feed = useSelector(selectFeed);
  const signup = useSelector(selectSignup);
  const newsletter = useSelector(selectNewsletter);
  const cart = useSelector(selectCart);
  const modal = useSelector(selectModal);
  useGetSecretQuery();
  useGetUserInfoQuery();
  useGetCartQuery(user?.id as number, { skip: !user });

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
            <Route path=":name" />
          </Route>
          <Route path="/clothing" element={<Category category="clothing" />}>
            <Route path=":param1">
              <Route path=":param2" />
            </Route>
          </Route>
          <Route
            path="/accessories"
            element={<Category category="accessories" />}
          >
            <Route path=":param1">
              <Route path=":param2" />
            </Route>
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/my" element={<My />}>
            <Route path=":param1" element={<></>} />
          </Route>
        </Routes>
        <Footer />
        {feed.flag && <Feed feed={feed} />}
        {newsletter.flag && <Newletter email={newsletter.email} />}
        {cart && <Cart />}
        {signup.flag && <Signup />}
        {modal.flag && (
          <Modal
            message={modal.message}
            onSubmit={modal.onSubmit}
            args={modal.args}
          />
        )}
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
