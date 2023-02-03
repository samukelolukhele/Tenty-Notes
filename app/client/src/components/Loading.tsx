import React from 'react';
import { Circles, Grid } from 'react-loader-spinner';
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

export const PageLoading = ({ colour }: { colour?: string }) => {
  return (
    <div className="loading-container">
      <Grid width={80} height={80} color={colour || colours.primary} />{' '}
      <h3>Loading please wait...</h3>{' '}
    </div>
  );
};

export default Loading;
