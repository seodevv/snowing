import React from 'react';
import { Box, Img } from './Styled';
import styled from 'styled-components';
import mainImg from '../img/main.jpg';

interface Style {
  [key: string]: string;
}

interface ProfileProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: Style;
  onClick?: (...args: any) => void;
  size?: string;
}

const ProfileBox = styled(Box)`
  border: none;
  border-radius: 50%;

  img {
    margin-top: 10%;
    object-fit: cover;
  }

  .profile {
    margin: unset;
    transform: unset;
  }
`;

const Profile = ({
  src,
  alt = 'image',
  className,
  style,
  onClick,
  size = '45px',
}: ProfileProps): JSX.Element => {
  const profileSrc =
    src?.search(/^http?s/) !== -1
      ? src
      : `${process.env.REACT_APP_SERVER_URL}/profile/${src}`;
  return (
    <>
      <ProfileBox wid={size} hei={size} overflow="hidden">
        <Img
          className={className}
          style={style}
          src={src ? profileSrc : mainImg}
          alt={alt}
          onClick={onClick}
          wid="100%"
          hei="100%"
          transform="scale(2)"
        />
      </ProfileBox>
    </>
  );
};

export default Profile;
