import React from 'react';

const useTruncate = () => {
  return (text: string, length: number) => {
    if (text.length >= length) {
      return text.substring(0, length) + '...';
    } else return text;
  };
};

export default useTruncate;
