import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useGetProductSizeQuery } from '../app/apiSlice';
import Balloon from './Balloon';

const SizeBox = styled(Box)`
  margin-top: 15px;
  position: relative;
  font-weight: 100;

  .title {
    font-size: 0.95rem;
  }

  .select {
    margin: 5px 5px 0 5px;
    padding: 10px 15px;
    position: relative;
    width: 100%;
    border: 1px solid #ccc;
    cursor: pointer;

    svg {
      position: absolute;
      top: 50%;
      right: 15px;
      color: #777;
      transform: translateY(-50%);
    }
  }

  .list {
    margin: 0 5px 5px 5px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    line-height: 2rem;
    list-style: none;
    box-shadow: 0 0 5px #ccc;
    transition: 0.1s all ease-in;
    visibility: hidden;
    opacity: 0;

    li {
      padding: 0 10px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }

  .active {
    visibility: visible;
    opacity: 1;
  }
`;

interface SizeProps {
  id: string | undefined;
  status: {
    sizeId: number;
    size: string;
  };
  setStatus: Dispatch<
    SetStateAction<{
      sizeId: number;
      size: string;
    }>
  >;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

const Size = ({ id, status, setStatus, error, setError }: SizeProps) => {
  const { data: sizes } = useGetProductSizeQuery(id, { skip: !id });
  const [active, setActive] = useState(false);
  const onChangeSelect = (sizeId: number, size: string) => {
    setError(false);
    setStatus({
      sizeId,
      size,
    });
  };

  return (
    <>
      <SizeBox>
        <p className="title">Size</p>
        <div
          className="select"
          onClick={() => {
            setActive((prev) => !prev);
          }}
        >
          <span>{status.size.replace(/^[a-z]/, (v) => v.toUpperCase())}</span>
          <FontAwesomeIcon icon={faChevronDown} />
          {error && <Balloon text="Plz Select" />}
        </div>
        <div className={`list ${active && 'active'}`}>
          {sizes?.data.map((v) => (
            <li
              key={v.id + v.size}
              onClick={() => {
                onChangeSelect(v.sizeId, v.size);
                setActive(false);
              }}
            >
              {v.size}
            </li>
          ))}
        </div>
      </SizeBox>
    </>
  );
};

export default Size;
