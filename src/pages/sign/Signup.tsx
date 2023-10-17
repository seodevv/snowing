import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FixedBox } from '../../components/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Box } from '../../components/Styled';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignup, selectSecret } from '../../app/slice';
import google from '../../img/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import {
  usePostAuthCodeMutation,
  usePostDuplicatedMutation,
  usePostLoginAppMutation,
  usePostLoginGoogleMutation,
  usePostUserRegistMutation,
} from '../../app/apiSlice';
import Spinner from '../../components/Spinner';
import CryptoJS from 'crypto-js';

const SignupBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 100;
  color: #fff;

  .inner {
    width: 320px;

    .title {
      margin: 20px 0;
      font-size: 2.7rem;
      font-weight: 100;
    }

    .welcome {
      font-size: 1rem;
    }

    .login {
      margin-left: 7px;
      font-size: 1rem;
      font-weight: normal;
      color: #888;
      cursor: pointer;
    }

    .or {
      margin: 12px auto 24px;
      height: 12px;
      border-bottom: 1px solid #666;
      text-align: center;

      span {
        padding: 0 15px;
        background: #000;
        font-size: 1rem;
      }
    }

    .bottom {
      margin-top: 30px;
      width: 100%;
      height: 300px;
      animation-name: fade-in;
      animation-duration: 0.3s;
      animation-timing-function: ease-in;
    }
  }

  .input-box {
    position: relative;
    width: 100%;
    text-align: center;

    &:hover {
      .input {
        border-color: #fff;
      }
    }

    .label {
      display: inline-block;
      color: #c0c0c0;
    }

    > div {
      position: relative;
    }

    .input {
      padding: 5px;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid #aaa;
      font-size: 1rem;
      color: #fff;
      text-align: center;
      outline: none;

      &:focus {
        border-color: #fff;
      }
    }
  }

  .input-box + .input-box {
    margin-top: 25px;
  }

  .google,
  .email,
  .signup {
    margin-bottom: 25px;
    padding: 7px 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    background: #fff;
    transition: 0.1s all ease-in;

    &:hover:enabled {
      filter: brightness(75%);
    }

    &:active:enabled {
      filter: brightness(90%) blur(1px);
      transition: none;
    }

    img {
      height: 100%;
    }

    .text {
      flex-grow: 1;
      font-size: 1rem;
      letter-spacing: -0.5px;
      color: #000;
    }
  }

  .email {
    margin-top: 35px;
    background: #000;
    border: 1px solid #666;

    &:hover:enabled {
      border: 1px solid #fff;
      filter: unset;
    }

    &:active:enabled {
      filter: blur(1px);
      transition: none;
    }

    .text {
      color: #fff;
    }
  }

  .signup {
    margin-top: 30px;
    padding: 15px;
    background: #4f77e9;
    border: none;
    font-size: 1rem;
    color: #fff;
    transition: 0.3s all ease-in;

    &:disabled {
      background: #777;
      opacity: 0.7;
    }
  }

  .error {
    background: #ca0000 !important;
    transition: 0.5s all ease-in !important;
  }

  .oauth {
    margin-top: 30px;
    width: 100%;
    height: 30px;

    img {
      height: 100%;
      cursor: pointer;
    }
  }

  .close {
    position: fixed;
    top: 50px;
    right: 50px;
    cursor: pointer;

    &:hover {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #fff);
    }

    &:active {
      filter: blur(1px);
    }
  }
`;

const Signup = () => {
  const dispatch = useDispatch();
  const secret = useSelector(selectSecret);

  const [signup, setSignup] = useState(true);
  const onChangeSignup = () => setSignup((prev) => !prev);

  const [login, setLogin] = useState(false);
  const onChangeLogin = () => setLogin(true);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authInput, setAuthInput] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailInput(e.target.value);
  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordInput(e.target.value);
  const onChangeAuthInput = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthInput(e.target.value);
  const canSignup = emailInput && passwordInput && isError === '';

  const [userCheck] = usePostLoginAppMutation();
  const [getDuplicated] = usePostDuplicatedMutation();
  const [getAuthCode] = usePostAuthCodeMutation();
  const [userRegist] = usePostUserRegistMutation();
  const onClickSignup = async (type: 'login' | 'signup' | 'auth') => {
    if (type === 'login') {
      setIsLoading(true);
      try {
        const {
          data: { result },
        } = await userCheck({
          email: emailInput,
          password: CryptoJS.AES.encrypt(passwordInput, secret).toString(),
        }).unwrap();
        setIsLoading(false);
        if (!result) {
          setIsError('Please check your ID/password.');
          return;
        }
        dispatch(closeSignup());
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError('Sorry, server error. please try agin');
      }
    } else if (type === 'signup') {
      const regex =
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
      setIsLoading(true);

      if (!regex.test(emailInput)) {
        setIsError('This is not a valid email format.');
        setIsLoading(false);
        return;
      }

      try {
        const {
          data: { duplicated },
        } = await getDuplicated(emailInput).unwrap();
        if (duplicated) {
          setIsError('This email is already registered.');
          setIsLoading(false);
          return;
        }

        const { data: authCode } = await getAuthCode(emailInput).unwrap();
        setAuthCode(authCode);
        setIsAuth(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsError('Sorry, server error. please try agin');
      }
    } else if (type === 'auth') {
      if (authInput.toUpperCase() === authCode) {
        try {
          setIsLoading(true);
          const body = {
            email: emailInput,
            password: CryptoJS.AES.encrypt(passwordInput, secret).toString(),
          };
          await userRegist(body);
          setIsLoading(false);
          dispatch(closeSignup());
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setIsError('Sorry, server error. please try agin');
        }
      } else {
        setIsError('This code is incorrect.');
      }
    }
  };

  const [getGoogleProfile] = usePostLoginGoogleMutation();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token, token_type }) => {
      try {
        await getGoogleProfile({
          access_token,
          token_type,
        }).unwrap();
        dispatch(closeSignup());
      } catch (error) {
        console.error(error);
      }
    },
  });

  useLayoutEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        dispatch(closeSignup());
      }
    };
    window.addEventListener('keydown', closeListener);
  }, []);

  useEffect(() => {
    if (login) {
      setTimeout(() => {
        if (emailRef.current) emailRef.current.focus();
      }, 50);
    }
  }, [login]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError('');
      }, 3000);
    }
  }, [isError]);

  return (
    <>
      <FixedBox bg="#000">
        <SignupBox>
          <div className="inner">
            <h1 className="title">{signup ? 'Sign Up' : 'Log In'}</h1>
            <p className="welcome">
              {signup ? 'Already a member?' : 'New to this site?'}
              <span className="login" onClick={() => onChangeSignup()}>
                {signup ? 'Log in' : 'Sign Up'}
              </span>
            </p>
            {login ? (
              <div className="bottom">
                {isAuth ? (
                  <div className="input-box">
                    <label htmlFor="auth" className="label">
                      Code
                    </label>
                    <div>
                      <input
                        id="auth"
                        className="input"
                        value={authInput}
                        onChange={onChangeAuthInput}
                        spellCheck={false}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="input-box">
                      <label htmlFor="email" className="label">
                        Email
                      </label>
                      <div>
                        <input
                          ref={emailRef}
                          id="email"
                          className="input"
                          value={emailInput}
                          onChange={onChangeEmailInput}
                          spellCheck={false}
                        />
                      </div>
                    </div>
                    <div className="input-box">
                      <label htmlFor="password" className="label">
                        Password
                      </label>
                      <div>
                        <input
                          id="password"
                          className="input"
                          type="password"
                          value={passwordInput}
                          onChange={onChangePasswordInput}
                          spellCheck={false}
                        />
                      </div>
                    </div>
                  </>
                )}
                <button
                  className={`signup ${isError && 'error'}`}
                  onClick={() =>
                    onClickSignup(isAuth ? 'auth' : signup ? 'signup' : 'login')
                  }
                  disabled={isAuth ? authInput === '' : !canSignup}
                >
                  {!isLoading ? (
                    isError !== '' ? (
                      isError
                    ) : signup ? (
                      'Sign Up'
                    ) : (
                      'Log in'
                    )
                  ) : (
                    <Spinner size="xl" color="#fff" />
                  )}
                </button>
                <div className="or">
                  <span>or sign up with</span>
                </div>
                <div className="oauth">
                  <img src={google} onClick={() => googleLogin()} />
                </div>
              </div>
            ) : (
              <div className="bottom">
                <button className="google" onClick={() => googleLogin()}>
                  <img src={google} alt="google" />
                  <p className="text">
                    {signup ? 'Sign up with Google' : 'Log in with Google'}
                  </p>
                </button>
                <div className="or">
                  <span>or</span>
                </div>
                <button className="email" onClick={() => onChangeLogin()}>
                  <p className="text">
                    {signup ? 'Sign up with email' : 'Log in with Email'}
                  </p>
                </button>
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            color="#fff"
            className="close"
            onClick={() => {
              dispatch(closeSignup());
            }}
          />
        </SignupBox>
      </FixedBox>
    </>
  );
};

export default Signup;
