import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UpdateUserModal,
  AddNoteModal,
  DeleteProfileModal,
} from "../components/Modal";
import useFetch from "./useFetch";

const useModal = () => {
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
      await DELETE("users").then((res) => {
        if (res.statusText !== "OK") {
          return setError({
            status: true,
            message: "Failed to delete profile",
          });
        }

        localStorage.removeItem("token");
        return nav("/");
      });
    };

    if (modal.type == "Update_User")
      return (
        <UpdateUserModal btnCloseClick={handleClose} bgClick={handleClose} />
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
