import React, { useLayoutEffect, useState } from 'react';
import { Box, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { ProductSubject, useGetProductSubjectQuery } from '../../app/apiSlice';

const SubjectBox = styled(FlexBox)`
  flex-flow: row wrap;
  justify-content: center;

  .item {
    margin: 15px;
    padding-top: 20%;
    position: relative;
    width: calc(20% - 30px);
    height: 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 42, 54, 0.4) 5px 5px, rgba(0, 42, 54, 0.3) 10px 10px,
      rgba(0, 42, 54, 0.2) 15px 15px, rgba(0, 42, 54, 0.1) 20px 20px,
      rgba(0, 42, 54, 0.05) 25px 25px;
    transition: 0.3s all ease-in;

    &:hover {
      box-shadow: rgba(0, 42, 54, 0.4) 5px -5px, rgba(0, 42, 54, 0.3) 10px -10px,
        rgba(0, 42, 54, 0.2) 15px -15px, rgba(0, 42, 54, 0.1) 20px -20px,
        rgba(0, 42, 54, 0.05) 25px -25px;
    }

    &:hover .item-bg {
      filter: brightness(25%);
    }

    &:hover .title {
      font-size: 1.3rem;
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff;
    }
  }

  .item-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.5);
    transition: 0.3s all ease-in;
  }

  .title {
    position: absolute;
    top: 50%;
    width: 100%;
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
    text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.3s all ease-in;
  }

  .loading {
    background: repeating-linear-gradient(
      45deg,
      transparent 150px,
      rgba(0, 0, 0, 0.1) 250px,
      transparent 300px
    );
    background-size: 500% 500%;
    animation: gradient 15s ease infinite;
    filter: blur(3px);
  }
`;

const ProductSubject = (): JSX.Element => {
  const {
    data: getSubjects,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductSubjectQuery();
  const [items, setItems] = useState<ProductSubject[]>(
    Array(4)
      .fill(undefined)
      .map((_, i) => ({
        id: i,
        subject: 'Loading Subject',
        image: 'LOADING.png',
        show_main: false,
      }))
  );

  useLayoutEffect(() => {
    if (isSuccess) {
      setItems(getSubjects.data);
    } else if (isError) {
      setItems(
        // errorState
        Array(4)
          .fill(undefined)
          .map((_, i) => ({
            id: i,
            subject: 'Network Error. Please try again',
            image: 'ERROR.png',
            show_main: false,
          }))
      );
    }
  }, [isSuccess, isError]);
  return (
    <>
      <Box>
        <SubjectBox>
          {items.map((item) => (
            <div key={item.id} className="item">
              <img
                className={`item-bg ${isLoading && 'loading'}`}
                src={`${process.env.REACT_APP_SERVER_URL}/files/${item.image}`}
              />
              <p className="title">{item.subject}</p>
            </div>
          ))}
        </SubjectBox>
      </Box>
    </>
  );
};

export default ProductSubject;
