import React from 'react';
import { Box } from '../../components/Styled';
import styled from 'styled-components';

interface Props {
  text: string;
}

const StyledHeader = styled.p`
  font-size: 1.2rem;
  text-shadow: 2px 3px 7px white, 3px 7px 1px #a1a1a1;
`;

const Header = ({ text }: Props): JSX.Element => {
  return (
    <>
      <Box ma="15px" wid="100%" bg="#fff" textAlign="center">
        <StyledHeader>{text.toUpperCase()}</StyledHeader>
      </Box>
    </>
  );
};

export default Header;
