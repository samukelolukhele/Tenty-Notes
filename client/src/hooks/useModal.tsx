import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UpdateUserModal,
  AddNoteModal,
  DeleteProfileModal,
  UpdateNoteModal,
  UploadImageModal,
  ChangePasswordModal,
} from "../components/Modal";
import useFetch from "./useFetch";

interface UserDefaultOptionsType {
  full_name?: string;
  username?: string;
  description?: string;
  email?: string;
}

interface NoteDefaultOptionsType {
  id?: number | string;
  defaults: {
    title: string;
    body: string;
  };
}

const useModal = (
  userDefaults: UserDefaultOptionsType,
  noteDefaults: NoteDefaultOptionsType
) => {
  const [modal, setModal] = useState({
    type: "Update_User",
    status: false,
  });
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const { DELETE } = useFetch();
  const nav = useNavigate();

  const handleModal = () => {
    if (!modal.status) return;

    const handleClose = () => {
      setModal({
        type: modal.type,
        status: false,
      });
    };

    const handleDelete = async () => {
      await DELETE("users", undefined)
        .then((res) => {
          localStorage.removeItem("token");
          return nav("/");
        })
        .catch((err) => {
          if (err.response.status != 202) {
            return setError({
              status: true,
              message: "Failed to delete profile",
            });
          }
        });
    };

    if (modal.type == "Change_Password")
      return (
        <ChangePasswordModal
          bgClick={handleClose}
          btnCloseClick={handleClose}
        />
      );

    if (modal.type == "Upload_Image")
      return (
        <UploadImageModal bgClick={handleClose} btnCloseClick={handleClose} />
      );

    if (modal.type == "Update_User")
      return (
        <UpdateUserModal
          defaults={userDefaults}
          btnCloseClick={handleClose}
          bgClick={handleClose}
        />
      );
    if (modal.type == "Update_Note")
      return (
        <UpdateNoteModal
          id={noteDefaults?.id}
          defaults={noteDefaults?.defaults}
          btnCloseClick={handleClose}
          bgClick={handleClose}
        />
      );

    if (modal.type == "Add_Note")
      return <AddNoteModal btnCloseClick={handleClose} bgClick={handleClose} />;

    if (modal.type == "Delete_User")
      return (
        <DeleteProfileModal
          onAccept={handleDelete}
          onCancel={handleClose}
          error={error.status}
          errorMessage={error.message}
        />
      );
  };

  return { handleModal, setModal, modal };
};

export default useModal;
