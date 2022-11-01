import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../src/styles/components/Modal/Modal.css";
import { UseFetchTypes } from "../hooks/types/@types.useFetch";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import Error from "./Error";

interface ModalProps {
  children?: React.ReactNode;
  bgClick?: any;
  btnCloseVisiible?: string;
  btnCloseClick?: any;
}

const Modal = (props: ModalProps) => {
  return (
    <>
      <div className="modal-bg" onClick={props.bgClick}></div>
      <div className="modal-container">
        <div className="modal">
          <button
            style={{ display: props.btnCloseVisiible }}
            className={`modal-close`}
            onClick={props.btnCloseClick}
          >
            X
          </button>
          <div className="modal-fields">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export const DeleteProfileModal = ({
  onAccept,
  onCancel,
  error = false,
  errorMessage = "",
}: {
  onAccept: void | any;
  onCancel: void | any;
  error: boolean;
  errorMessage: string;
}) => {
  return (
    <Modal btnCloseVisiible="none">
      <div className="dialogue-box">
        <p>
          Deleting your profile will also delete all of your notes. Are you sure
          you want to delete your profile?
        </p>
        <div className="btn-container">
          <button className="btn btn-tetiary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={onAccept}>
            Delete
          </button>
        </div>
        {error && <Error message={errorMessage} />}
      </div>
    </Modal>
  );
};

export const AddNoteModal = (props: ModalProps) => {
  const initialState = {
    title: null,
    body: null,
  };

  const { state, bind } = useForm(initialState);
  const { POST } = useFetch<UseFetchTypes>();
  const nav = useNavigate();

  const handleSubmit = async () => {
    await POST("notes", true, state).then(() => window.location.reload());
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick} bgClick={props.bgClick}>
      <label>Title</label>
      <input type="text" name="title" {...bind} />
      <label>Content</label>
      <textarea rows={8} name="body" {...bind} />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export const UpdateUserModal = (props: ModalProps) => {
  const initialState = {
    full_name: null,
    username: null,
    email: null,
    description: null,
  };
  const { state, bind } = useForm(initialState);
  const { PATCH } = useFetch<UseFetchTypes>();

  const handleSubmit = async () => {
    await PATCH("users", state).then(() => window.location.reload());
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick} bgClick={props.bgClick}>
      <label>Full Name</label>
      <input type="text" name="full_name" {...bind} />
      <label>Username</label>
      <input type="text" name="username" {...bind} />
      <label>Email</label>
      <input type="email" name="email" {...bind} />
      <label>Description</label>
      <textarea rows={8} name="description" {...bind} />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export default Modal;
