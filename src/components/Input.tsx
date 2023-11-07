import React, {
  ChangeEvent,
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box, GlobalProps } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const InputBox = styled(Box)`
  position: relative;
  background: ${(props) => props.bg};

  label {
    position: absolute;
    top: 5px;
    left: 16px;
    font-size: 0.8rem;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
    cursor: pointer;
  }

  label.visible {
    visibility: visible;
    opacity: 1;
  }

  input {
    padding: 12px;
    width: 100%;
    height: 100%;
    background: ${(props) => props.bg};
    border: none;
    border-radius: ${(props) => props.br};
    font-size: 0.9rem;
    color: ${(props) => props.color};
    outline: none;
    vertical-align: middle;
    transition: 0.3s all ease-in;

    &:focus {
      outline: 3px solid #0251ac;
    }
  }

  .require {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
  }

  .require.visible {
    visibility: visible;
    opacity: 1;
  }
`;

interface InputProps extends GlobalProps {
  label?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  limit?: number;
  regex?: RegExp;
  require?: boolean;
  phone?: boolean;
}

const Input = forwardRef(
  (
    {
      label,
      state,
      setState,
      limit,
      regex,
      require = false,
      phone = false,
      ma = '15px 0',
      pa,
      dis,
      wid = '100%',
      hei = '50px',
      bg = 'transparent',
      bd = '1px solid #777',
      br = '10px',
      color,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [active, setActive] = useState(false);

    let style: { [key in string]: string } = {};
    if (active) {
      style.padding = '25px 30px 7px 15px';
    }

    useLayoutEffect(() => {
      if (state !== '') setActive(true);
    }, [state]);

    return (
      <>
        <InputBox
          ma={ma}
          pa={pa}
          wid={wid}
          hei={hei}
          dis={dis}
          bg={bg}
          bd={bd}
          br={br}
          color={color}
        >
          <label className={`${active && 'visible'}`}>{label}</label>
          <input
            ref={ref}
            placeholder={label}
            value={state}
            style={style}
            onChange={(
              e: ChangeEvent<HTMLInputElement> & {
                nativeEvent: { inputType: string };
              }
            ) => {
              if (limit && e.target.value.length > limit) return;
              if (regex && !regex.test(e.target.value) && e.target.value !== '')
                return;
              if (
                phone &&
                e.nativeEvent.inputType !== 'deleteContentBackward' &&
                (/^[0-9]{3}$/.test(e.target.value) ||
                  /^[0-9]{3}-[0-9]{4}$/.test(e.target.value))
              ) {
                return setState(e.target.value + '-');
              }
              if (e.target.value === '') setActive(false);
              else setActive(true);
              e.target.classList.remove('error');
              setState(e.target.value);
            }}
          />
          <div className="error-box"></div>
          <FontAwesomeIcon
            className={`require ${require && !active && 'visible'}`}
            icon={faStar}
            color="#d81e1e"
            size="xs"
          />
        </InputBox>
      </>
    );
  }
);

export default Input;
