import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FlexBox } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useGetProductNavigatorQuery } from '../app/apiSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProductNavigator = styled(FlexBox)`
  margin-bottom: 50px;
  flex-wrap: nowrap;
  align-items: center;

  .navigate {
    flex-grow: 1;
    color: #777;

    .depth {
      margin: 0 5px;
      text-decoration: none;
    }

    span {
      font-size: 1.05rem;
      color: #000;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.75;
      }
    }
  }

  .controller {
    user-select: none;

    svg {
      margin: 0 5px;
    }

    span {
      margin: 0 5px;

      &:not(:nth-of-type(2)) {
        cursor: pointer;
      }
    }
  }

  .disabled {
    opacity: 0.3;

    span {
      text-decoration: line-through;
      cursor: unset !important;
    }
  }
`;

interface NavigatorProps {
  id: string | undefined;
}

interface State {
  ids: number[];
}

const Navigator = ({ id }: NavigatorProps) => {
  const navigator = useNavigate();
  const state = useLocation().state as State | undefined;

  const {
    data: navi = {
      data: {
        id: -1,
        category: '',
        name: '',
        subject: '',
        type: '',
      },
    },
    isLoading,
    isError,
  } = useGetProductNavigatorQuery(id, { skip: !id });

  return (
    <>
      <ProductNavigator>
        <div className="navigate">
          <span
            onClick={() => {
              navigator('/');
            }}
          >
            HOME
          </span>
          <span className="depth">/</span>
          <span
            onClick={() => {
              if (isLoading || isError) return;
              navigator(
                `/${navi.data.category.toLowerCase()}/${navi.data.type.toLowerCase()}`
              );
            }}
          >
            {navi.data.type}
          </span>
          <span className="depth">/</span>
          <span
            onClick={() => {
              if (isLoading || isError) return;
              navigator(
                `/${navi.data.category.toLowerCase()}/${navi.data.type.toLowerCase()}/${navi.data.subject.toLowerCase()}`
              );
            }}
          >
            {navi.data.subject}
          </span>
          <span className="depth">/</span>
          {navi.data.name}
        </div>
        <div className={`controller ${!state?.ids && 'disabled'}`}>
          <span
            onClick={() => {
              if (state?.ids && id) {
                const index = state.ids.findIndex((v) => v.toString() === id);
                navigator(
                  index === 0
                    ? `/product/${state.ids[state.ids.length - 1]}`
                    : `/product/${state.ids[index - 1]}`,
                  { state: { ids: state.ids } }
                );
              }
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Prev
          </span>
          <span>|</span>
          <span
            onClick={() => {
              if (state?.ids && id) {
                const index = state.ids.findIndex((v) => v.toString() === id);
                navigator(
                  index === state.ids.length - 1
                    ? `/product/${state.ids[0]}`
                    : `/product/${state.ids[index + 1]}`,
                  { state: { ids: state.ids } }
                );
              }
            }}
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </ProductNavigator>
    </>
  );
};

export default Navigator;
