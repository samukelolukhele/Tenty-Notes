import React from 'react';

interface CheckTypes {
  capsCheck: boolean;
  lowerCheck: boolean;
  lengthCheck: boolean;
  numberCheck: boolean;
}

const PwdRequisites = ({
  capsCheck,
  lowerCheck,
  lengthCheck,
  numberCheck,
}: CheckTypes) => {
  const checkValid = (check: boolean) => (check ? 'valid' : '');

  return (
    <div className="pwd-requisites">
      <p className={checkValid(lowerCheck)}>Must contain a lowercase letter</p>
      <p className={checkValid(capsCheck)}>Must contain a capital letter</p>
      <p className={checkValid(numberCheck)}>Must contain a number</p>
      <p className={checkValid(lengthCheck)}>Must be longer than 7 character</p>
    </div>
  );
};

export default PwdRequisites;
