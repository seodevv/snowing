import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Box, FlexBox, GlobalProps } from './Styled';
import { closeFeed, initialCommonState } from '../app/slice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Profile from './Profile';

export const FixedBox = styled.section<GlobalProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  font-weight: 100;
  background: ${(props) => props.bg};
  backdrop-filter: ${(props) => props.backdropFilter};
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
`;

const FeedBox = styled(Box)`
  width: 50%;

  .image,
  .video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .info {
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #3f3f3f;
    color: #fff;

    img {
      cursor: pointer;
      transition: 0.3s all ease-in;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.9;
        transition: none;
      }
    }
  }

  .grow {
    margin-left: 15px;
    flex-grow: 1;

    .name {
      cursor: pointer;
      transition: 0.3s all ease-in;

      &:hover {
        filter: drop-shadow(0 0 5px #bbb) drop-shadow(0 0 10px #bbb);
      }

      &:active {
        filter: blur(1px);
        transition: none;
      }
    }

    .date {
      font-size: 0.85rem;
      color: #c4c4c4;
    }
  }

  .icon {
    position: relative;

    svg {
      display: block;
      width: 20px;
      height: 20px;
      transition: 0.3s all ease-in;

      &:hover {
        filter: drop-shadow(0 0 5px #bbb) drop-shadow(0 0 10px #bbb)
          drop-shadow(0 0 15px #bbb);

        + .balloon {
          visibility: visible;
          opacity: 1;
        }
      }

      &:active {
        filter: blur(1px);
        transition: none;
      }
    }

    .balloon {
      padding: 6px 12px;
      position: absolute;
      top: -55px;
      left: -90px;
      width: 200px;
      height: 50px;
      background: #222222;
      border: 1px solid #525252;
      font-size: 0.8rem;
      text-align: center;
      visibility: hidden;
      opacity: 0;
      transition: 0.3s all ease-in;
    }
  }

  .caption {
    padding: 20px;
    padding-right: 5px;
    flex-grow: 1;
    border-bottom: 1px solid #3f3f3f;
    color: #fff;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 15px;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #757575;
    }

    .name {
      margin-right: 5px;
    }

    .content {
      color: #c4c4c4;
    }

    .date {
      margin-left: 5px;
      font-size: 0.85rem;
      line-height: 2rem;
      color: #c4c4c4;
    }
  }

  .reaction {
    padding: 15px 25px 20px;
    font-size: 0.9rem;
    color: #c4c4c4;

    .comments {
      margin-left: 10px;
    }
  }
`;

const CloseFeed = styled(FontAwesomeIcon)`
  position: fixed;
  top: 25px;
  right: 25px;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.3s all ease-in;

  &:hover {
    transform: rotate(360deg);
  }

  &:active {
    filter: blur(5px);
    transition: none;
  }
`;

interface FeedProps {
  feed: typeof initialCommonState.feed;
}

const Feed = ({ feed }: FeedProps) => {
  const dispatch = useDispatch();
  const date = new Date(feed.timestamp);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const captions = feed.caption.split(/\r\n|\r|\n/);
  console.log(feed, date, captions);

  useLayoutEffect(() => {
    const closeEvent = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        dispatch(closeFeed());
      }
    };
    window.addEventListener('keydown', closeEvent);
    return () => {
      window.removeEventListener('keydown', closeEvent);
    };
  }, []);
  return (
    <>
      <FixedBox
        bg="rgba(255, 255, 255, 0.5)"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            dispatch(closeFeed());
          }
        }}
      >
        <FlexBox bg="#000" wid="75%" hei="50%">
          <FeedBox>
            {(feed.media_type === 'IMAGE' ||
              feed.media_type === 'CAROUSEL_ALBUM') && (
              <img className="image" src={feed.media_url} alt="feed-image" />
            )}
            {feed.media_type === 'VIDEO' && (
              <video
                className="video"
                src={feed.media_url}
                poster={feed.thumbnail_url}
                controls
              />
            )}
          </FeedBox>
          <FeedBox dis="flex" flexDir="column">
            <div className="info">
              <Profile
                size="40px"
                onClick={() => {
                  window.open(`//instagram.com/${feed.username}`);
                }}
              />
              <div className="grow">
                <p
                  className="name"
                  onClick={() => {
                    window.open(`//instagram.com/${feed.username}`);
                  }}
                >
                  {feed.username}
                </p>
                <span className="date">
                  {months[date.getMonth()]} {date.getDate()},{' '}
                  {date.getFullYear()}
                </span>
              </div>
              <div
                className="icon"
                onClick={() => {
                  window.open(feed.permalink);
                }}
              >
                <FontAwesomeIcon icon={faInstagram} />
                <div className="balloon">
                  View this post in a new tab on instagram.
                </div>
              </div>
            </div>
            <div className="caption">
              <span className="name">{feed.username}</span>
              {captions.map((caption, i) => (
                <span key={i} className="content">
                  {caption}
                  <br />
                </span>
              ))}
              <span className="date">
                {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
              </span>
            </div>
            <div className="reaction">
              <span className="like">likes 0</span>
              <span className="comments">comments 0</span>
            </div>
          </FeedBox>
        </FlexBox>
        <CloseFeed
          icon={faXmark}
          onClick={() => {
            dispatch(closeFeed());
          }}
        />
      </FixedBox>
    </>
  );
};

export default Feed;
