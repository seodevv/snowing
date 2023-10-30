import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, FlexBox } from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartB } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartA } from '@fortawesome/free-regular-svg-icons';
import Size from '../../components/Size';
import Quantity from '../../components/Quantity';
import Navigator from '../../components/Navigator';
import {
  ProductList,
  useGetProductsListByIdQuery,
  useGetWishQuery,
  usePostWishMutation,
} from '../../app/apiSlice';
import ProductDescription from './ProductDescription';
import Slide from '../../components/Slide';
import ProductImage from './ProductImage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, showCart, showSignup } from '../../app/slice';
import { useParams } from 'react-router-dom';

const ProductBox = styled.section`
  margin-top: 150px;
  margin-bottom: 50px;
  padding: 25px;
  background: #fff;
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
`;

const ProductContent = styled(FlexBox)`
  align-items: flex-start;

  .info {
    flex: 3;

    .brand {
      margin-top: 15px;

      span {
        font-size: 1.2rem;
        font-style: italic;
        font-weight: bold;
        text-decoration: underline;
        letter-spacing: 1px;
        vertical-align: middle;
      }

      img {
        width: 100px;
        vertical-align: middle;
      }
    }

    .name {
      font-size: 1.8rem;
    }

    .price {
      margin-top: 25px;
      font-size: 1.3rem;
      font-weight: bold;
      color: #a1a1a1;
      letter-spacing: 3px;
    }
  }

  .installment {
    margin-top: 15px;
    font-size: 1rem;
    font-weight: 100;
    color: #a1a1a1;
  }

  .active {
    height: auto;
  }

  .read-more {
    display: inline-block;
    font-weight: bolder;
    text-decoration: underline;
    letter-spacing: -1px;
    user-select: none;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }

  .actions {
    margin-top: 25px;
    display: flex;
    height: 50px;

    .cart {
      padding: 15px;
      flex-grow: 1;
      display: block;
      background: #000;
      border: none;
      color: #fff;
      text-align: center;
      transition: 0.1s all ease-in;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.75;
        transition: none;
      }
    }

    .wish {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100%;
      background: #fff;
      border: 1px solid #777;

      &:hover {
        filter: brightness(0.9);
      }

      &:active {
        filter: blur(1px);
      }
    }
  }
`;

export interface Cart extends ProductList {
  count: number;
}

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [postWish] = usePostWishMutation();

  const {
    data: product = {
      data: {
        id: -1,
        name: 'Loading Product',
        brandName: 'Loading Brand',
        brandLogo: 'loading.png',
        desc: 'Loading Description',
        price: 999999,
        image: 'loading.png',
        size: 'free',
      },
    },
  } = useGetProductsListByIdQuery(id, { skip: !id });

  const { data: wish = { data: { result: false } } } = useGetWishQuery(
    { userId: user ? user.id : -1, listId: id ? id : '-1' },
    { skip: !user?.id || !id ? true : false }
  );

  const [current, setCurrent] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [size, setSize] = useState('select');
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addCartHandler = () => {
    if (product.data.id === -1) return;
    if (size === 'select') return setSizeError(true);

    if (!user) {
      const local = localStorage.getItem('cart');
      let items: Cart[] = local ? JSON.parse(local) : [];
      const check = items.findIndex(
        (v) => v.id === product.data.id && v.size === product.data.size
      );
      if (check !== -1) {
        items[check].count++;
      } else {
        items.push({
          id: product.data.id,
          name: product.data.name,
          desc: product.data.desc,
          price: product.data.price,
          image: product.data.image,
          size: size,
          count: quantity,
        });
      }
      localStorage.setItem('cart', JSON.stringify(items));
      dispatch(showCart());
      return;
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    setSize('select');
    setSizeError(false);
    setQuantity(1);
  }, [id]);

  return (
    <>
      <ProductBox key={id}>
        <Box ma="auto" wid="100%" maxWid="980px">
          <Navigator id={id} />
          <ProductContent>
            <Slide
              images={product.data.image}
              status={current}
              setStatus={setCurrent}
            />
            <ProductImage images={product.data.image} status={current} />
            <div className="info">
              <div className="brand">
                {product.data.brandLogo ? (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/files/${product.data.brandLogo}`}
                    alt={product.data.brandLogo}
                  />
                ) : (
                  <span>
                    {product.data.brandName?.replace(/^[a-z]/, (v) =>
                      v.toUpperCase()
                    )}
                  </span>
                )}
              </div>
              <h1 className="name">{product.data.name}</h1>
              <p className="price">\{product.data.price.toLocaleString()}</p>
              <p className="installment">
                or 4 interest-free payments of \
                {(product.data.price / 4).toLocaleString()} with Payment
              </p>
              <ProductDescription
                id={id}
                desc={product.data.desc}
                status={readMore}
              />
              <div
                className="read-more"
                onClick={() => {
                  setReadMore((prev) => !prev);
                }}
              >
                <span>{readMore ? 'Less' : 'Read more'}</span>
              </div>
              <Size
                id={id}
                status={size}
                setStatus={setSize}
                error={sizeError}
                setError={setSizeError}
              />
              <Quantity
                text="quantity"
                status={quantity}
                setStatus={setQuantity}
              />
              <div className="actions">
                <button className="cart" onClick={() => addCartHandler()}>
                  Add to Cart
                </button>
                <div
                  className="wish"
                  onClick={async () => {
                    if (!user) {
                      dispatch(showSignup());
                    } else if (id) {
                      try {
                        await postWish({ userId: user.id, listId: id });
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={wish.data.result ? heartB : heartA}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </ProductContent>
        </Box>
      </ProductBox>
    </>
  );
};

export default Product;
