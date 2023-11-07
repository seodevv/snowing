import React, { useLayoutEffect, useState } from 'react';
import { Box, GridBox } from '../../components/Styled';
import styled from 'styled-components';
import { InstaFeeds, useGetInstaFeedQuery } from '../../app/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { showFeed } from '../../app/slice';
import loadingImage from '../../img/LOADING.png';
import errorImage from '../../img/ERROR.png';

const HeaderBox = styled(Box)`
  padding: 50px 0 25px;
  text-align: center;

  .header {
    font-family: 'Rubik Moonrocks';
  }

  .desc {
    margin: auto;
    margin-top: 15px;
    max-width: 50%;
    font-size: 1rem;
  }

  .insta {
    margin: auto;
    margin-top: 25px;
    display: block;
    width: 45px;
    height: 45px;
    transition: 0.3s all ease-in;
    cursor: pointer;

    &:hover {
      background: #000;
      color: #fff;

      + .insta-link {
        visibility: visible;
        opacity: 1;
      }
    }

    &:active {
      filter: blur(1px);
      transition: none;

      + .insta-link {
        filter: blur(1px);
        transition: none;
      }
    }
  }

  .insta-link {
    font-style: italic;
    font-weight: bold;
    text-decoration: underline;
    color: #4770f4;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
    cursor: pointer;

    &:hover {
      visibility: visible;
      opacity: 1;
    }

    &:active {
      filter: blur(1px);
      transition: none;
    }
  }
`;

const InstaFeedsBox = styled(GridBox)`
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);

  .item {
    position: relative;
    overflow: hidden;

    &:hover {
      .caption {
        visibility: visible;
        opacity: 1;
      }
    }

    &:active {
      .caption {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        transition: none;
      }
    }
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .type {
    padding: 5px 10px;
    position: absolute;
    top: 7px;
    right: 7px;
    display: block;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: #fff;
  }

  .caption {
    padding: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
  }

  .big {
    grid-column: span 2;
    grid-row: span 2;
  }

  .loading {
    background: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 1) 150px,
      rgba(0, 0, 0, 0.9) 250px,
      rgba(0, 0, 0, 1) 300px
    );
    background-size: 500% 500%;
    animation: gradient 15s ease infinite;
    filter: blur(3px);
  }
`;

const MoreBox = styled(Box)`
  padding: 50px;
  text-align: center;

  .more {
    padding: 12px 24px;
    background: #000;
    border: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 100;
    color: #fff;

    &:hover:enabled {
      filter: brightness(75%);
    }

    &:active:enabled {
      filter: blur(1px);
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`;

const InstaFeeds = (): JSX.Element => {
  const dispatch = useDispatch();

  const initialState: InstaFeeds[] = Array(12)
    .fill(undefined)
    .map((_, i) => ({
      id: i,
      media_type: 'image',
      media_url: ``,
      permalink: '/',
      username: 'snowing',
      caption: 'Loading',
      timestamp: new Date().toISOString(),
    }));
  const [page, setPage] = useState<number>(0);
  const [feeds, setFeeds] = useState<InstaFeeds[]>(initialState);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const {
    data: getFeeds,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useGetInstaFeedQuery(page);

  const desc =
    "Snowboard clothing brand 'Snowing' is a brand that provides modern and stylish snowboard clothing and is famous for its products that perform excellently even in snow and cold temperatures. Snowing combines design and technological innovation to create products suitable for anyone with a passion for snow sports.";

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setFeeds(getFeeds.data.feeds);
      setIsEnd(getFeeds.data.isEnd);
    } else if (isError) {
      setFeeds(
        Array(12)
          .fill(undefined)
          .map((_, i) => ({
            id: i,
            media_type: 'image',
            media_url: ``,
            permalink: '/',
            username: 'snowing',
            caption: 'Sorry, Network Error. please try again',
            timestamp: new Date().toISOString(),
          }))
      );
    }
  }, [isSuccess, isFetching, isError]);

  return (
    <>
      <Box>
        <HeaderBox bg="#fff">
          <h1 className="header">ABOUT US</h1>
          <p className="desc">{desc}</p>
          <div>
            <FontAwesomeIcon
              className="insta"
              icon={faSquareInstagram}
              onClick={() => {
                window.open('//instagram.com/snowin.g');
              }}
            />
            <p
              className="insta-link"
              onClick={() => {
                window.open('//instagram.com/snowin.g');
              }}
            >
              instagram.com/snowin.g
            </p>
          </div>
        </HeaderBox>
        <InstaFeedsBox>
          {feeds.map((feed, i) => {
            const isBig = i % 6 === 0 ? `big` : '';
            const isImage =
              feed.media_type === 'IMAGE' ||
              feed.media_type === 'CAROUSEL_ALBUM';
            return (
              <div
                key={feed.id}
                className={`item ${isBig} ${
                  feed.caption === 'Loading' && 'loading'
                }`}
                onClick={() => {
                  if (feed.caption === 'Loading') return;
                  if (isError) return;
                  dispatch(showFeed(feed));
                }}
              >
                <img
                  className="image"
                  src={
                    isLoading
                      ? loadingImage
                      : isError
                      ? errorImage
                      : isImage
                      ? feed.media_url
                      : feed.thumbnail_url
                  }
                />
                <FontAwesomeIcon
                  className="type"
                  icon={isImage ? faImages : faClapperboard}
                />
                <div className="caption">
                  <span>{feed.caption}</span>
                </div>
              </div>
            );
          })}
        </InstaFeedsBox>
        <MoreBox pa="50px">
          <button
            className="more"
            onClick={() => {
              setPage((prev) => prev + 1);
              setFeeds((prev) => [...prev, ...initialState]);
            }}
            disabled={isEnd || isFetching}
          >
            {!isEnd ? 'Load More' : 'End Content'}
          </button>
        </MoreBox>
      </Box>
    </>
  );
};

export default InstaFeeds;
