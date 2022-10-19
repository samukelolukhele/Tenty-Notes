import React from "react";
import "../styles/components/Card/Card.css";
import { BsTrash2 } from "react-icons/bs";
import { AiOutlinePushpin } from "react-icons/ai";
import useTruncate from "../hooks/useTruncate";

interface CProps {
  title: string;
  body: string;
  author?: string;
  delClick?: (e: React.MouseEvent<SVGElement>) => void;
}

const Card = ({ title, body, author, delClick }: CProps) => {
  const truncate = useTruncate();
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <p className="card-author">{author}</p>

          <hr />
        </div>
        <div className="card-body">
          <p>{truncate(body, 50)}</p>
        </div>
        <div className="card-tetiary">
          <BsTrash2 className="trash-icon" onClick={delClick} />
        </div>
      </div>
    </>
  );
};

export default Card;
