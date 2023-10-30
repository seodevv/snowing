import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';

const BalloonBox = styled(Box)`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  transform: ${(props) => (props.top === '50%' ? 'translateY(-50%)' : 'unset')};
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;

  .balloon {
    padding: 6px 12px;
    position: relative;
    display: inline-block;
    background: #f00;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 100;
    text-align: center;
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 7px solid #f00;
      top: 50%;
      right: -7px;
      transform: translateY(-50%);
    }
  }
`;

interface BalloonProps {
  text: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const Balloon = ({
  text,
  top = '50%',
  right,
  bottom,
  left = '-95px',
}: BalloonProps) => {
  return (
    <>
      <BalloonBox top={top} right={right} bottom={bottom} left={left}>
        <div className="balloon">
          <span>{text}</span>
        </div>
      </BalloonBox>
    </>
  );
};

export default Balloon;
