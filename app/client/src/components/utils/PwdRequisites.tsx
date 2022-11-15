import React from "react";

const PwdRequisites = ({
  capsCheck,
  lowerCheck,
  lengthCheck,
  numberCheck,
}: any) => {
  return (
    <div className="pwd-requisites">
      <p className={lowerCheck && "valid"}>Must contain a lowercase letter</p>
      <p className={capsCheck && "valid"}>Must contain a capital letter</p>
      <p className={numberCheck && "valid"}>Must contain a number</p>
      <p className={lengthCheck && "valid"}>Must be longer than 7 character</p>
    </div>
  );
};

export default PwdRequisites;
