import React from 'react';
import { Box } from '../../components/Styled';

interface Props {
  text: string;
}

const Header = ({ text }: Props): JSX.Element => {
  return (
    <>
      <Box ma="15px" wid="100%" bg="#fff" textAlign="center">
        <h3>{text.toUpperCase()}</h3>
      </Box>
    </>
  );
};

export default Header;
