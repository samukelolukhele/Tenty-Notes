import React from "react";
import useLink from "../hooks/useLink";

interface UProps {
  className?: string;
  userId: any;
  username: string;
  route: string;
}

const Username = ({ className, username, userId, route }: UProps) => {
  const handleLink = useLink();
  return (
    <p onClick={() => handleLink(route, userId)} className={className}>
      @{username}
    </p>
  );
};

export default Username;
