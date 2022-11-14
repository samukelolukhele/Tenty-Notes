import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineCamera } from "react-icons/ai";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useFetch from "../../hooks/useFetch";
import useLink from "../../hooks/useLink";
import useModal from "../../hooks/useModal";
import useUserData from "../../hooks/useUserData";
import Card from "../Card";
import "../../styles/pages/profile/profile.css";
import useGetSearchParams from "../../hooks/useGetSearchParams";
import { AuthContext } from "../../context/AuthContext";
import { Grid } from "react-loader-spinner";
import { colours } from "../utils/colours";

const Profile = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { loggedInUser } = useContext(AuthContext);
  const { user, handleProfileData } = useUserData();
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
  const searchTerm = useGetSearchParams("id");
  const authRedirect = useAuthRedirect();
  const handleLinkId = useLink();

  const { DELETE } = useFetch();

  const handleEdit = (note: any) => {
    setModal({ status: true, type: "Update_Note" });
    return setNoteContent(note);
  };

  const handleDel = async (id: string) => {
    await DELETE("notes", id).then(() => window.location.reload());
  };

  useEffect(() => {
    authRedirect;
    handleProfileData(searchTerm);
  }, []);

  return (
    <div className="profile-page">
      {handleModal()}
      {!user.id ? (
        <div className="loading-container">
          <Grid width={80} height={80} color={colours.primary} />{" "}
          <h3>Loading please wait...</h3>{" "}
        </div>
      ) : (
        <>
          <div className="profile">
            <div className="container profile-container">
              <div className="profile-img">
                <AiOutlineCamera className="profile-img-logo" />
                {user.profile_image && (
                  <img
                    src={`${serverUrl}users/profile-image/${user.profile_image}`}
                  />
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name-container">
                  <h2 className="profile-name">{user.full_name}</h2>
                  <p className="profile-username">@{user.username}</p>
                  {loggedInUser?.id === Number(searchTerm) ||
                  searchTerm === "" ? (
                    <div className="action-btns">
                      <button
                        className="btn btn-add-note btn-success"
                        onClick={() =>
                          setModal({ type: "Add_Note", status: true })
                        }
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
                  ) : (
                    <></>
                  )}
                </div>
                <p className="profile-description">{user.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {user.note.map((note: any, i) => {
              return (
                <Card
                  key={i + note.title}
                  username={user.username}
                  userId={user.id}
                  route="dashboard/profile"
                  title={note.title}
                  loggedInUserId={loggedInUser?.id}
                  body={note.body || "Loading content..."}
                  editClick={() => handleEdit(note)}
                  delClick={() => handleDel(note.id)}
                  onClick={() => handleLinkId("note", note.id)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
