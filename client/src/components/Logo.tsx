import React from "react";

interface LogoTypes {
  size?: number;
}

const Logo = ({ size }: LogoTypes) => {
  return (
    <h1 className="logo" style={{ fontSize: `${size || 2}rem` }}>
      <span>Tenty</span>NOTES
    </h1>
  );
};

export default Logo;
