import React from "react";
import "../styles/components/Card/Card.css";
import { BsTrash2 } from "react-icons/bs";
import { AiOutlinePushpin } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { UseHoverTypes } from "../hooks/types/@types.useHover";
import useTruncate from "../hooks/useTruncate";
import useHover from "../hooks/useHover";
import useFetch from "../hooks/useFetch";
import useLink from "../hooks/useLink";
import Username from "./Username";

interface CProps {
  title: string;
  body: string;
  username: string;
  userId: any;
  route: string;
  loggedInUserId: any;
  delClick?: (e: React.MouseEvent<SVGElement>) => void;
  editClick?: (e: React.MouseEvent<SVGElement>) => void;
  onClick: React.MouseEventHandler<any>;
}

const Card = ({
  title,
  body,
  username,
  userId,
  route,
  delClick,
  editClick,
  onClick,
  loggedInUserId,
}: CProps) => {
  const { hover, handleHover } = useHover();

  const truncate = useTruncate();
  const editPrivileges = loggedInUserId === userId ? true : false;

  return (
    <>
      <div
        className="card"
        onMouseOver={() => handleHover(true)}
        onMouseOut={() => handleHover(false)}
      >
        <div className="card-header">
          <h3 className="card-title" onClick={onClick}>
            {title}
          </h3>
          <Username
            username={username}
            userId={userId}
            route={route}
            className="card-author"
          />

          <hr />
        </div>
        <div className="card-body">
          <p>{truncate(body, 50)}</p>
        </div>
        {hover && editPrivileges ? (
          <div className="card-tetiary">
            <HiOutlinePencil className="pencil-icon" onClick={editClick} />
            <BsTrash2 className="trash-icon" onClick={delClick} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Card;
