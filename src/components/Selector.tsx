import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Box, GlobalProps } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SelectorBox = styled(Box)`
  position: relative;
  transition: 0.3s all ease-in;

  label {
    position: absolute;
    top: 5px;
    left: 16px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .select {
    padding: 25px 30px 7px 15px;
    width: 100%;
    height: 100%;
    background: ${(props) => props.bg};
    border-radius: ${(props) => props.br};
    font-weight: bold;
    font-size: 0.9rem;
    color: ${(props) => props.color};
    cursor: pointer;
  }

  .down {
    padding: 5px;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .option {
    margin-top: 5px;
    padding: 6px 12px;
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    max-height: 250px;
    background: ${(props) => props.bg};
    border: ${(props) => props.bd};
    font-size: 0.8rem;
    color: ${(props) => props.color};
    line-height: 1.5rem;
    list-style: none;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s visibility ease-in;
    transition: 0.3s opacity ease-in;
    overflow-y: scroll;
    cursor: pointer;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #777;
    }

    &::-webkit-scrollbar-track-piece {
      background: rgba(255, 255, 255, 0.1);
    }

    li {
      &:hover {
        background: #0251ac;
      }

      &:active {
        opacity: 0.75;
      }
    }
  }
  .option.visible {
    visibility: visible;
    opacity: 1;
  }
`;

export interface SelectorData {
  data: { id: number; name: string }[];
  id: number;
}

interface SelectorProps extends GlobalProps {
  label?: string;
  status: SelectorData;
  setStatus: Dispatch<SetStateAction<SelectorData>>;
}

const Selector = ({
  label,
  status,
  setStatus,
  ma,
  dis,
  wid = '100%',
  hei = '50px',
  bg = 'transparent',
  bd = '1px solid #777',
  br = '10px',
  color = '#fff',
}: SelectorProps) => {
  const [active, setActive] = useState(false);

  let style: { [key in string]: string } = {};
  if (active) {
    style.outline = '3px solid #0251ac';
    style.border = '1px solid transparent';
  }

  return (
    <>
      <SelectorBox
        ma={ma}
        dis={dis}
        wid={wid}
        hei={hei}
        bg={bg}
        bd={bd}
        br={br}
        color={color}
        style={style}
      >
        {label && (
          <label onClick={() => setActive((prev) => !prev)}>{label}</label>
        )}
        <div className="select" onClick={() => setActive((prev) => !prev)}>
          <span>{status.data.find((v) => v.id === status.id)?.name}</span>
        </div>
        <div className="down" onClick={() => setActive((prev) => !prev)}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={`option ${active && 'visible'}`}>
          {status.data.map((c) => (
            <li
              key={c.id}
              onClick={() => {
                setStatus((prev) => ({ data: prev.data, id: c.id }));
                setActive(false);
              }}
            >
              {c.name}
            </li>
          ))}
        </div>
      </SelectorBox>
    </>
  );
};

export default Selector;
