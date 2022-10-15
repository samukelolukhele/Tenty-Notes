import React, { useEffect, useState } from "react";
import { UseFetchTypes } from "../../hooks/types/@types.useFetch";
import useFetch from "../../hooks/useFetch";
import Card from "../Card";
import "../../styles/pages/dashboard/dashboard.css";

const Dashboard = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const { GET, DELETE } = useFetch<UseFetchTypes>("notes");
  const handleNotes = async () => {
    await GET().then((res) => setNotes(res.data));
  };

  const handleDel = async () => {
    await DELETE().then((res) => console.log(res));
  };

  useEffect(() => {
    handleNotes();
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          {notes.map((note) => {
            return (
              <Card title={note.title} body={note.body} delClick={handleDel} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
