import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card";
import "../../styles/pages/dashboard/dashboard.css";
import { AiOutlineCamera, AiOutlinePlus } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useLink from "../../hooks/useLink";
import useUserData from "../../hooks/useUserData";
import useModal from "../../hooks/useModal";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import Username from "../Username";

const Dashboard = () => {
  const nav = useNavigate();
  const { user, notes, handleDashboardData } = useUserData();
  const [noteContent, setNoteContent] = useState({
    id: "",
    title: "",
    body: "",
  });

  const { handleModal, setModal } = useModal(
    {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      description: user.description,
    },
    {
      id: noteContent.id,
      defaults: {
        title: noteContent.title,
        body: noteContent.body,
      },
    }
  );
  const handleLinkId = useLink();
  const { DELETE } = useFetch();
  const authRedirect = useAuthRedirect();

  const handleDel = async (id: string | number | undefined) => {
    await DELETE("notes", id).then(() => window.location.reload());
  };

  const handleEdit = (note: any) => {
    setModal({ status: true, type: "Update_Note" });
    return setNoteContent(note);
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
              <AiOutlineCamera className="profile-img-logo" />
              <img
                onClick={() => setModal({ status: true, type: "Upload_Image" })}
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
                    className="btn btn-edit-profile btn-tetiary"
                    onClick={() =>
                      setModal({ type: "Update_User", status: true })
                    }
                  >
                    <HiOutlinePencil className="pencil-icon" />
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() =>
                      setModal({ type: "Change_Password", status: true })
                    }
                  >
                    Change Password
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
              <p className="profile-description">{user.description}</p>
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
                loggedInUserId={user.id}
                editClick={() => handleEdit(note)}
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
