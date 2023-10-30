import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const QuantityBox = styled(Box)`
  margin-top: 15px;
  font-weight: 100;

  .title {
    font-size: 0.95rem;
  }

  .quantity {
    position: relative;
    display: inline-block;
    margin: 5px 5px 0 5px;

    input {
      padding: 10px 15px;
      width: 100px;
      height: 100%;
      border: 1px solid #ccc;
      font-size: 1rem;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
      }
    }

    .controller {
      position: absolute;
      top: 50%;
      right: 10px;
      height: 100%;
      transform: translateY(-50%);
      color: #777;
      user-select: none;

      svg {
        display: block;
        width: 10px;
        height: 50%;
        cursor: pointer;
      }
    }
  }
`;

interface QuantityProps {
  text: string;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
}

const Quantity = ({ text, status, setStatus }: QuantityProps) => {
  return (
    <>
      <QuantityBox>
        <p className="title">
          {text.replace(/^[a-z]/, (v) => v.toUpperCase())}
        </p>
        <div className="quantity">
          <input
            type="number"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
          />
          <div className="controller">
            <FontAwesomeIcon
              icon={faChevronUp}
              onClick={() => setStatus((prev) => prev + 1)}
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={() => {
                if (status === 1) return;
                setStatus((prev) => prev - 1);
              }}
            />
          </div>
        </div>
      </QuantityBox>
    </>
  );
};

export default Quantity;
