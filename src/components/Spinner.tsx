import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface SpinnerProps {
  className?: string;
  style?: {
    [key: string]: string;
  };
  size?: SizeProp;
  color?: string;
}

const Spinner = ({
  className,
  style,
  size = '1x',
  color = '#000',
}: SpinnerProps) => {
  return (
    <>
      <FontAwesomeIcon
        className={className}
        style={style}
        icon={faSpinner}
        size={size}
        color={color}
        spin
      />
    </>
  );
};

export default Spinner;
