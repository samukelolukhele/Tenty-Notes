import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useFetch from "../../hooks/useFetch";
import useLink from "../../hooks/useLink";
import useModal from "../../hooks/useModal";
import useUserData from "../../hooks/useUserData";
import Card from "../Card";
import "../../styles/pages/profile/profile.css";
import useGetSearchParams from "../../hooks/useGetSearchParams";

const Profile = () => {
  const { user, handleProfileData } = useUserData();
  const { setModal, handleModal } = useModal();
  const searchTerm = useGetSearchParams("id");
  const authRedirect = useAuthRedirect();
  const handleLinkId = useLink();

  const { DELETE } = useFetch();

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
      <div className="profile">
        <div className="container profile-container">
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
              <p className="profile-username">@{user.username}</p>
              {user.id === Number(searchTerm) || searchTerm === "" ? (
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
                    onClick={() => alert("Create Note!")}
                  >
                    Delete Profile
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p className="profile-description">Hey I'm on Tenty Notes!</p>
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
              body={note.body}
              delClick={() => handleDel(note.id)}
              onClick={() => handleLinkId("/note", note.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
