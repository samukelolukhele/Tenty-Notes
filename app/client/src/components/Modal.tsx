import React, { ChangeEvent, useState } from "react";

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

interface UpdateUserProps extends ModalProps {
  defaults?: {
    full_name?: string;
    username?: string;
    email?: string;
    description?: string;
  };
}

interface UpdateNoteProps extends ModalProps {
  id?: number | string;
  defaults?: {
    title?: string;
    body?: string;
  };
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

export const ChangePasswordModal = (props: ModalProps) => {
  const initialState = {
    password: "",
    confirmPassword: null,
  };

  const { state, bind } = useForm(initialState);
  const { POST, handleFetchError, fetchError } = useFetch();

  const handleSubmit = async () => {
    await POST("users/change-password", true, state)
      .then((res) => {
        return window.location.reload();
      })
      .catch((err) => {
        const status = err.response.status;

        handleFetchError(status, 201, "Failed to change password", true);
        handleFetchError(
          status,
          401,
          "The password that was entered was incorrect"
        );
      });
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick}>
      <label>Current Password</label>
      <input type="password" name="currentPassword" {...bind} />
      <label>New Password</label>
      <input type="password" name="newPassword" {...bind} />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
      {fetchError.status && <Error message={fetchError.message} />}
    </Modal>
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

export const UpdateUserModal = (props: UpdateUserProps) => {
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
      <input
        type="text"
        name="full_name"
        defaultValue={props.defaults?.full_name}
        {...bind}
      />
      <label>Username</label>
      <input
        type="text"
        name="username"
        defaultValue={props.defaults?.username}
        {...bind}
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        defaultValue={props.defaults?.email}
        {...bind}
      />
      <label>Description</label>
      <textarea
        rows={8}
        name="description"
        defaultValue={props.defaults?.description}
        {...bind}
      />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export const UpdateNoteModal = (props: UpdateNoteProps) => {
  const initialState = {
    title: null,
    body: null,
  };

  const { state, bind } = useForm(initialState);
  const { PATCH } = useFetch();

  const handleSubmit = async () => {
    await PATCH("notes/" + props.id, state).then(() =>
      window.location.reload()
    );
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick} bgClick={props.bgClick}>
      <label>Title</label>
      <input
        type="text"
        name="title"
        defaultValue={props.defaults?.title}
        {...bind}
      />
      <label>Content</label>
      <textarea
        rows={8}
        name="body"
        defaultValue={props.defaults?.body}
        {...bind}
      />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export const UploadImageModal = (props: ModalProps) => {
  const initialState = {
    filename: null,
  };

  const [file, setFile] = useState({
    file: {
      filename: null,
    },
  });

  const data = new FormData();

  const handleChange = (e: ChangeEvent<any>) => {
    const { target } = e;

    data.append("file", target.files[0]);
  };
  const { POST, handleFetchError, fetchError } = useFetch();

  const handleSubmit = async () => {
    await POST("users/upload", true, data)
      .then((res) => {
        return !fetchError.status && window.location.reload();
      })
      .catch((err) => {
        handleFetchError(
          err.response.status,
          401,
          "You are not allowed to make these changes"
        );
        handleFetchError(
          err.response.status,
          201,
          "Failed to upload image",
          true
        );
      });
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick}>
      <div className="file-upload-container">
        <input
          type="file"
          multiple={false}
          accept="image/*"
          className="file-upload"
          required
          name="filename"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-tetiary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {fetchError.status && <Error message={fetchError.message} />}
    </Modal>
  );
};

export default Modal;
