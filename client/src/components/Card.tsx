import React from "react";
import "../styles/components/Card/Card.css";
import { BsTrash2 } from "react-icons/bs";
import { AiOutlinePushpin } from "react-icons/ai";

interface CProps {
  title: string;
  body: string;
  author?: string;
  delClick?: (e: React.MouseEvent<SVGElement>) => void;
}

const Card = ({ title, body, author, delClick }: CProps) => {
  const truncate = (s: string) => s.substring(0, 50) + "...";
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <p>Quintus Batiatus</p>
          <hr />
        </div>
        <div className="card-body">
          <p>{truncate(body)}</p>
        </div>
        <div className="card-tetiary">
          <BsTrash2 className="trash-icon" onClick={delClick} />
          <p className="card-author">{author}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
