import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterSort, setFilter } from '../app/slice';

const SortBox = styled(Box)`
  margin: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .sort {
    position: relative;
    width: 200px;
    height: 40px;
    border: 1px solid #777;

    button {
      padding: 0 15px;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      font-size: 1rem;
      letter-spacing: 0.5px;
      text-align: start;
      cursor: pointer;
    }

    svg {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .list {
    padding: 12px 0;
    position: absolute;
    top: 165px;
    z-index: 1;
    width: 200px;
    background: #fff;
    border: 1px solid #777;
    list-style: none;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;

    div {
      padding: 8px 12px;

      span {
        padding: 0px 12px;
      }

      &:hover:not(.select) {
        background: #eee;
      }

      &:active:not(.select) {
        background: #ccc;
      }
    }

    .select {
      background: #ccc;
    }
  }

  .active {
    visibility: visible !important;
    opacity: 1 !important;
  }
`;

export type SortArray = [
  'newest',
  'popular',
  'price (low to high)',
  'price (high to low)',
  'name A-Z',
  'name Z-A'
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectFilterSort);

  const [active, setActive] = useState(false);

  const array: SortArray = [
    'newest',
    'popular',
    'price (low to high)',
    'price (high to low)',
    'name A-Z',
    'name Z-A',
  ];

  return (
    <>
      <SortBox
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(false);
        }}
      >
        <div
          className="sort"
          onClick={() => {
            setActive((prev) => !prev);
          }}
        >
          <button>
            {array[sort].replace(/^[a-z]/, (v) => v.toUpperCase())}
          </button>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={`list ${active && 'active'}`}>
          {array.map((item, i) => (
            <div
              className={`${i === sort && 'select'}`}
              key={item}
              onClick={() => {
                dispatch(setFilter({ sort: i }));
                setActive(false);
              }}
            >
              <span>{item.replace(/^[a-z]/, (v) => v.toUpperCase())}</span>
            </div>
          ))}
        </div>
      </SortBox>
    </>
  );
};

export default Sort;
