import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const CategoryBox = styled(Box)`
  position: relative;
  border-bottom: 1px solid #000;
  overflow: hidden;

  span {
    padding-left: 5px;
    font-size: 1rem;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    font-size: 0.9rem;
  }

  .accordian {
    max-height: 0;
    transition: 0.3s all ease-out;
  }

  .accordian.view {
    max-height: 100dvh;
  }
`;

interface CategoryProps {
  text: string;
  active?: boolean;
  list?: ReactNode;
}

const Filter = ({ text, active = false, list }: CategoryProps) => {
  const [view, setView] = useState(active);
  const onChangeActive = () => setView((prev) => !prev);

  return (
    <>
      <CategoryBox>
        <Box
          pa="20px 0"
          posit="relative"
          cursor="pointer"
          onClick={() => onChangeActive()}
        >
          <span>{text}</span>
          <FontAwesomeIcon icon={view ? faMinus : faPlus} />
        </Box>
        <Box className={`accordian ${view && 'view'}`}>{list}</Box>
      </CategoryBox>
    </>
  );
};

export default Filter;
