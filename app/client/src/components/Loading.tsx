import React from 'react';
import { Circles } from 'react-loader-spinner';
import { colours } from './utils/colours';

const Loading = ({ colour }: { colour?: string }) => {
  return (
    <Circles
      wrapperClass="loading"
      width={40}
      height={40}
      color={colour || colours.tetiary}
    />
  );
};

export default Loading;
