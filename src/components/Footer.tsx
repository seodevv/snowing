import React, { ChangeEvent, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, FlexBox } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCcAmex,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
  faInstagram,
  faSquareFacebook,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { showNewsletter } from '../app/slice';
import { useLocation, useNavigate } from 'react-router-dom';

const FooterBox = styled.section<{ ma?: string }>`
  margin: ${(props) => props.ma};
  position: relative;
`;

const FooterHeader = styled(Box)`
  padding: 50px;
  display: flex;
  background: #fff;
`;

const FooterItem = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 300px;
  font-size: 0.9rem;
  font-weight: 100;
  letter-spacing: 1px;

  .newsletter {
    margin-bottom: 30px;
  }

  .newsinput {
    width: 330px;
    height: 35px;

    * {
      height: 100%;
      vertical-align: top;
    }

    input {
      padding: 6px 12px;
      width: 250px;
    }

    button {
      width: 80px;
      border: none;
      background: #494949;
      color: #fff;
      cursor: pointer;
    }
  }

  .newserror {
    margin-top: 5px;
    color: #f00;
    text-decoration: underline;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
  }

  .active {
    visibility: visible;
    opacity: 1;
  }

  .companyinfo {
    text-align: center;

    .item:not(:first-of-type) {
      margin-top: 15px;
    }

    .icon {
      cursor: pointer;
    }

    .icon:not(:first-of-type) {
      margin-left: 15px;
    }
  }
`;

const FooterContent = styled(Box)`
  padding: 50px;
  background: #000;
  font-size: 0.9rem;
  font-weight: 100;
  color: #fff;

  .list {
    margin: 50px 0;
    list-style: none;
    text-align: center;

    li {
      margin: 0 10px;
      display: inline-block;
      cursor: pointer;
      transition: 0.3s all ease-in;

      &:hover {
        text-shadow: white 2px 3px 7px, rgb(161, 161, 161) 0px 10px 1px;
      }

      &:active {
        filter: blur(1px);
        transition: none;
      }
    }
  }

  .accept {
    text-align: center;
    height: 30px;

    span {
      margin-right: 10px;
    }

    .icon {
      display: inline-block;
      height: 100%;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
`;

const Copylight = styled(Box)`
  margin: 15px 0;
  font-size: 0.8rem;
  font-weight: 100;
  text-align: center;
`;

const Footer = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [margin, setMargin] = useState('0');

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(e.target.value);
  };
  const onClickJoin = () => {
    const regex =
      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

    if (regex.test(email)) {
      dispatch(showNewsletter(email));
      setEmail('');
    } else {
      setError(true);
    }
  };

  useLayoutEffect(() => {
    if (['/brands'].includes(location.pathname)) {
      setMargin('0 0 0 240px');
    } else {
      setMargin('0');
    }
  }, [location]);

  return (
    <>
      <FooterBox ma={margin}>
        <FooterHeader>
          <FooterItem>
            <p className="newsletter">NEWSLETTER</p>
            <div className="newsinput">
              <input
                value={email}
                onChange={onChangeEmail}
                placeholder="Enter your email here*"
              />
              <button
                className="btn-effect"
                disabled={!email}
                onClick={onClickJoin}
              >
                Join
              </button>
            </div>
            <div className={`newserror ${error && 'active'}`}>
              <p>This is not a valid email format.</p>
            </div>
          </FooterItem>
          <FooterItem>
            <div className="companyinfo">
              <div className="item">
                <p>snowing@gmail.com (invalid)</p>
                <p>02 1234 4567 (invalid)</p>
              </div>
              <div className="item">
                <p>in Seoul, Repulic of korea</p>
                <p>12345</p>
              </div>
              <div className="item">
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  size="xl"
                  className="icon"
                />
                <FontAwesomeIcon icon={faXTwitter} size="xl" className="icon" />
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="xl"
                  className="icon"
                />
              </div>
            </div>
          </FooterItem>
        </FooterHeader>
        <FooterContent>
          <ul className="list">
            <li onClick={() => navigator('/contact')}>CONTACT US</li>
            <li>ABOUT</li>
            <li>RETURNS & SHIPPING</li>
            <li>TEAMS & CONDITION</li>
            <li>FAQ's</li>
          </ul>
          <div className="accept">
            <span>We Accept</span>
            <FontAwesomeIcon icon={faCcVisa} className="icon" />
            <FontAwesomeIcon icon={faCcMastercard} className="icon" />
            <FontAwesomeIcon icon={faCcAmex} className="icon" />
            <FontAwesomeIcon icon={faCcPaypal} className="icon" />
          </div>
        </FooterContent>
        <Copylight>
          <span>
            © 2023 by Snowing Clothing Gallery.
            <br />
          </span>
          <span>Proudly created with seo.devv</span>
        </Copylight>
      </FooterBox>
    </>
  );
};

export default Footer;
