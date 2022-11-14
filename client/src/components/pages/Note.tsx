import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { useLocation, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useGetSearchParams from "../../hooks/useGetSearchParams";
import "../../styles/pages/note/note.css";
import Username from "../Username";
import { colours } from "../utils/colours";

const Note = () => {
  const [note, setNote] = useState({
    title: "",
    body: "",
    created_at: "",
    updated_at: "",
    author: {
      email: "",
      username: "",
      id: null,
      description: "",
      profile_image: "",
      full_name: "",
    },
  });

  const { GET } = useFetch();
  const searchTerm = useGetSearchParams("id");

  const handlePageData = async () => {
    return await GET("notes/" + searchTerm).then((res) => setNote(res.data));
  };

  useEffect(() => {
    handlePageData();
  }, []);
  console.log(note.author.id);

  return !note.title ? (
    <div className="loading-container">
      <Grid height={80} width={80} color={colours.primary} />
      <h3>Loading please wait...</h3>
    </div>
  ) : (
    <div className="container-small">
      <div className="note">
        <div className="note-container">
          <div className="note-title-container">
            <h1 className="note-title">{note.title}</h1>
            <div className="note-username-container">
              <img
                className="note-image"
                src={
                  import.meta.env.VITE_SERVER_URL +
                  `users/profile-image/${note.author.profile_image}`
                }
              />
              <Username
                username={note.author.username}
                userId={note.author.id}
                route="dashboard/profile"
                className="note-username"
              />
              <p className="note-date">{note.created_at}</p>
            </div>
          </div>
          <div className="note-content-container">
            <p className="note-body">{note.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
