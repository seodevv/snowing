import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPrice, setFilter } from '../app/slice';

const PriceBox = styled(Box)`
  padding: 0 5px 10px 5px;
  width: 100%;

  .value {
    font-size: 0.9rem;
    font-weight: 100;
  }

  input {
    width: 100%;
  }
`;

const Price = () => {
  const dispatch = useDispatch();
  const price = useSelector(selectFilterPrice);

  const [value, setValue] = useState(price.maxPrice);
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setValue(value);
  };
  const onChangeStatus = () => {
    dispatch(
      setFilter({
        price: {
          flag: true,
          maxPrice: value,
        },
      })
    );
  };

  return (
    <>
      <PriceBox>
        <Box textAlign="right">
          <span className="value">~{value.toLocaleString()}</span>
        </Box>
        <Box>
          <input
            type="range"
            list="price"
            min={0}
            max={1000000}
            value={value}
            onChange={onChangeValue}
            onMouseUp={() => onChangeStatus()}
          />
          <datalist id="price">
            <option value={0}>0</option>
            <option value={250000}>0</option>
            <option value={500000}>500000</option>
            <option value={750000}>0</option>
            <option value={1000000}>1000000</option>
          </datalist>
        </Box>
      </PriceBox>
    </>
  );
};

export default Price;
