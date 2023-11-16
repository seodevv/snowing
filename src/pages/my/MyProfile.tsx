import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { MYMENUS } from '../../navbar/Navbar';
import { usePostLogoutMutation } from '../../app/apiSlice';
import { selectUser } from '../../app/slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfileBox = styled(Box)`
  padding: 75px 25px;
  flex: 1;
  max-width: 300px;
  background: #000;

  .profile-box {
    padding: 25px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #777;

    .image {
      width: 125px;
      height: 125px;
      border: none;
      border-radius: 50%;
      overflow: hidden;
    }

    .nick {
      margin-top: 10px;
      font-size: 1.3rem;
      color: #fff;
      text-align: center;
    }
  }

  .menu-box {
    margin-top: 25px;
    padding: 10px 25px;
    border: 1px solid #777;

    li {
      padding: 6px 12px;
      font-size: 1.1rem;
      color: #fff;
      letter-spacing: 0.5px;
      list-style: none;
      transition: 0.1s opacity ease-in;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.75;
        transition: none;
      }
    }

    li.select {
      opacity: 0.5;
    }
  }
`;

interface MyProfileProps {
  menu: string;
}

const MyProfile = ({ menu }: MyProfileProps) => {
  const navigator = useNavigate();
  const user = useSelector(selectUser);

  const [postLogout] = usePostLogoutMutation();
  const onClickLogout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MyProfileBox>
        <div className="profile-box">
          <div>
            <div className="image">
              <img
                src={user?.picture}
                alt="profile"
                width="100%"
                height="100%"
              />
            </div>
            <div className="nick">
              <span>{user?.nick}</span>
            </div>
          </div>
        </div>
        <div className="menu-box">
          {MYMENUS.map((v) => {
            if (v.name === 'Logout') {
              return (
                <li
                  key={v.name}
                  className={`${v.url === menu && 'select'}`}
                  onClick={() => onClickLogout()}
                >
                  {v.name}
                </li>
              );
            }
            return (
              <li
                key={v.name}
                className={`${v.url === menu && 'select'}`}
                onClick={() => {
                  if (v.url === menu) return;
                  navigator(`/my/${v.url}`);
                }}
              >
                {v.name}
              </li>
            );
          })}
        </div>
      </MyProfileBox>
    </>
  );
};

export default MyProfile;
