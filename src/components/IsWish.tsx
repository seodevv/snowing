import React, { useLayoutEffect, useState } from 'react';
import { Wish, useGetWishQuery, usePostWishMutation } from '../app/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, showSignup } from '../app/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartB } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartA } from '@fortawesome/free-regular-svg-icons';

interface IsWishProps {
  id: number;
}

const IsWish = ({ id }: IsWishProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [postWish] = usePostWishMutation();

  const [wish, setWish] = useState<Wish>({ result: false });

  const {
    data: getWish,
    isSuccess,
    isFetching,
    isError,
  } = useGetWishQuery(
    { userId: user ? user.id : -1, listId: id ? id.toString() : '-1' },
    { skip: !user?.id || !id }
  );

  useLayoutEffect(() => {
    if (isFetching) {
      setWish({
        result: false,
      });
    } else if (isSuccess && !isFetching) {
      setWish(getWish.data);
    } else if (isError) {
      setWish({
        result: false,
      });
    }
  }, [isSuccess, isFetching, isError, id]);

  return (
    <>
      <div
        className="wish"
        onClick={async () => {
          if (!user) {
            dispatch(showSignup());
          } else if (id) {
            try {
              await postWish({ userId: user.id, listId: id.toString() });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        <FontAwesomeIcon icon={wish.result ? heartB : heartA} size="lg" />
      </div>
    </>
  );
};

export default IsWish;
