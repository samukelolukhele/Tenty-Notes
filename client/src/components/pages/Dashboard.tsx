import React, { useContext, useEffect, useState } from "react";
import { UseFetchTypes } from "../../hooks/types/@types.useFetch";
import useFetch from "../../hooks/useFetch";
import Card from "../Card";
import "../../styles/pages/dashboard/dashboard.css";
import { AuthContext } from "../../context/AuthContext";
import { AddNoteModal, UpdateUserModal } from "../Modal";
import { useNavigate } from "react-router-dom";

interface UserProps {
  full_name: string;
  username: string;
  description: string;
  email: string;
  id: number | null;
  profile_image: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [user, setUser] = useState<UserProps>({
    email: "",
    username: "",
    id: null,
    description: "",
    profile_image: "",
    full_name: "",
  });

  const [modal, setModal] = useState({
    type: "Update_User",
    status: false,
  });

  const nav = useNavigate();

  const handleModal = () => {
    if (!modal.status) return;

    const handleClose = () => {
      setModal({
        type: modal.type,
        status: false,
      });
    };

    if (modal.type == "Update_User")
      return (
        <UpdateUserModal btnCloseClick={handleClose} bgClick={handleClose} />
      );
    if (modal.type == "Add_Note")
      return <AddNoteModal btnCloseClick={handleClose} bgClick={handleClose} />;
  };

  const { GET, DELETE } = useFetch<UseFetchTypes>();

  const handleNotes = async () => {
    await GET("users/profile", true)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));

    await GET("notes").then((res) => setNotes(res.data));
  };
  const handleDel = async (id: any) => {
    await DELETE("notes", id).then((res) => console.log(res));
    window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return nav("/login0");
    handleNotes();
  }, []);

  return (
    <div className="dashboard">
      {handleModal()}
      <div className="container">
        <div className="profile">
          <div className="profile-container">
            <div className="profile-img">
              <img
                src={
                  "http://localhost:8080/users/profile-image/" +
                  user.profile_image
                }
              />
            </div>
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">{user.full_name}</h2>
                <div className="action-btns">
                  <button
                    className="btn btn-success"
                    onClick={() => setModal({ type: "Add_Note", status: true })}
                  >
                    Create Note
                  </button>
                  <button
                    className="btn btn-tetiary"
                    onClick={() =>
                      setModal({ type: "Update_User", status: true })
                    }
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => alert("Create Note!")}
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
              <p className="profile-description">Hey I'm on Tenty Notes!</p>
            </div>
          </div>
        </div>
        <div className="row">
          {notes.map((note, i) => {
            return (
              <Card
                key={i + note.title}
                author={note.author}
                title={note.title}
                body={note.body}
                delClick={() => handleDel(note.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
