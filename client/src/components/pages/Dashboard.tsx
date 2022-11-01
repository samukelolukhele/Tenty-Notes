import React, { useEffect, useState, useTransition } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card";
import "../../styles/pages/dashboard/dashboard.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useLink from "../../hooks/useLink";
import useUserData from "../../hooks/useUserData";
import useModal from "../../hooks/useModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import Username from "../Username";

const Dashboard = () => {
  const nav = useNavigate();
  const { user, notes, handleDashboardData } = useUserData();
  const { handleModal, setModal } = useModal();
  const handleLinkId = useLink();
  const { DELETE } = useFetch();
  const authRedirect = useAuthRedirect();

  const handleDel = async (id: string | undefined) => {
    await DELETE("notes", id).then(() => window.location.reload());
  };

  useEffect(() => {
    authRedirect;
    handleDashboardData();
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
                <Username
                  className="profile-username"
                  username={user.username}
                  userId={user.id}
                  route="dashboard/profile"
                />
                <div className="action-btns">
                  <button
                    className="btn btn-add-note btn-success"
                    onClick={() => setModal({ type: "Add_Note", status: true })}
                  >
                    <AiOutlinePlus />
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
                    onClick={() =>
                      setModal({ type: "Delete_User", status: true })
                    }
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
                username={note.author.username}
                userId={note.author.id}
                route="dashboard/profile"
                title={note.title}
                body={note.body}
                delClick={() => handleDel(note.id)}
                onClick={() => handleLinkId("/note", note.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
