import React, { ChangeEvent, useState } from 'react';
import { Circles } from 'react-loader-spinner';

import '../../src/styles/components/Modal/Modal.css';
import { UseFetchTypes } from '../hooks/types/@types.useFetch';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import Error from './Error';
import Loading from './Loading';
import { colours } from './utils/colours';
import PwdRequisites from './utils/PwdRequisites';

interface ModalProps {
  children?: React.ReactNode;
  bgClick?: any;
  btnCloseVisiible?: boolean;
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
            style={{
              display: props.btnCloseVisiible ? 'inline-block' : 'none',
            }}
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
    password: '',
    confirmPassword: null,
  };
  const [loading, setLoading] = useState(false);
  const [pwdRequisites, setPwdRequisites] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    lowerLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
  });

  const { state, bind } = useForm(initialState);
  const { POST, handleFetchError, fetchError, setFetchError } = useFetch();

  const handleSubmit = async () => {
    Object.values(checks).some(async (v) => {
      if (v === false) {
        setFetchError({ status: false, message: '' });
        setLoading(false);
        return setError({
          status: true,
          message: 'Password requirements not met',
        });
      } else {
        setLoading(true);
        setError({ status: false, message: '' });
        setFetchError({ status: false, message: '' });

        await POST('users/change-password', true, state)
          .then(() => {
            return window.location.reload();
          })
          .catch((err) => {
            const status = err.response.status;
            setLoading(false);
            handleFetchError(status, 201, 'Failed to change password', true);
            handleFetchError(
              status,
              401,
              'The password that was entered was incorrect',
            );
          });
      }
    });
  };

  const handleOnKeyUp = (e: ChangeEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();

    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const lowerLetterCheck = /[a-z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length > 7;

    setChecks({
      capsLetterCheck,
      lowerLetterCheck,
      numberCheck,
      pwdLengthCheck,
    });
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick} btnCloseVisiible={true}>
      <label>Current Password</label>
      <input type="password" name="currentPassword" {...bind} />
      <label>New Password</label>
      <input
        type="password"
        name="newPassword"
        {...bind}
        onKeyUp={handleOnKeyUp}
        onFocus={() => setPwdRequisites(true)}
        // onBlur={() => setPwdRequisites(false)}
      />
      {pwdRequisites && (
        <PwdRequisites
          capsCheck={checks.capsLetterCheck}
          lowerCheck={checks.lowerLetterCheck}
          lengthCheck={checks.lowerLetterCheck}
          numberCheck={checks.numberCheck}
        />
      )}
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
      {fetchError.status && <Error message={fetchError.message} />}
      {error.status && <Error message={error.message} />}
      {loading && <Circles width={40} height={40} color={colours.tetiary} />}
    </Modal>
  );
};

export const DeleteDialogueModal = ({
  onAccept,
  onCancel,
  error = false,
  errorMessage = '',
  text = '',
  loading = false,
}: {
  onAccept: void | any;
  onCancel: void | any;
  error: boolean;
  errorMessage: string;
  text: string;
  loading: boolean;
}) => {
  return (
    <Modal btnCloseVisiible={false}>
      <div className="dialogue-box">
        <p>{text}</p>
        <div className="btn-container">
          <button className="btn btn-tetiary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={onAccept}>
            Delete
          </button>
        </div>
        {error && <Error message={errorMessage} />}
        {loading && <Circles width={40} height={40} color={colours.tetiary} />}
      </div>
    </Modal>
  );
};

export const AddNoteModal = (props: ModalProps) => {
  const initialState = {
    title: null,
    body: null,
  };

  const [loading, setLoading] = useState(false);

  const { state, bind } = useForm(initialState);
  const { POST, handleFetchError, fetchError } = useFetch<UseFetchTypes>();

  const handleSubmit = async () => {
    setLoading(true);
    await POST('notes', true, state)
      .then(() => {
        setLoading(false);
        return window.location.reload();
      })
      .catch((err) => {
        const status = err.response.status;
        setLoading(false);
        handleFetchError(status, 201, 'Failed to add note', true);
      });
  };

  return (
    <Modal
      btnCloseClick={props.btnCloseClick}
      bgClick={props.bgClick}
      btnCloseVisiible={true}
    >
      <label>Title</label>
      <input type="text" maxLength={24} name="title" {...bind} />
      <label>Content</label>
      <textarea rows={8} name="body" {...bind} />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
      {loading && <Loading />}
      {fetchError.status && <Error message={fetchError.message} />}
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
  const { PATCH, handleFetchError, fetchError } = useFetch<UseFetchTypes>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await PATCH('users', state)
      .then(() => {
        return window.location.reload();
      })
      .catch((err) => {
        const status = err.response.status;
        setLoading(false);
        handleFetchError(status, 201, 'Failed to update user', true);
      });
  };

  return (
    <Modal
      btnCloseClick={props.btnCloseClick}
      bgClick={props.bgClick}
      btnCloseVisiible={true}
    >
      <label>Full Name</label>
      <input
        type="text"
        maxLength={24}
        name="full_name"
        defaultValue={props.defaults?.full_name}
        {...bind}
      />
      <label>Username</label>
      <input
        maxLength={12}
        type="text"
        name="username"
        defaultValue={props.defaults?.username}
        {...bind}
      />
      <label>Email</label>
      <input
        maxLength={45}
        type="email"
        name="email"
        defaultValue={props.defaults?.email}
        {...bind}
      />
      <label>Description</label>
      <textarea
        maxLength={120}
        rows={8}
        name="description"
        defaultValue={props.defaults?.description}
        {...bind}
      />
      <button className="btn btn-tetiary" onClick={handleSubmit}>
        Submit
      </button>
      {loading && <Loading />}
      {fetchError.status && <Error message={fetchError.message} />}
    </Modal>
  );
};

export const UpdateNoteModal = (props: UpdateNoteProps) => {
  const initialState = {
    title: null,
    body: null,
  };

  const [loading, setLoading] = useState(false);

  const { state, bind } = useForm(initialState);
  const { PATCH, fetchError, handleFetchError } = useFetch();

  const handleSubmit = async () => {
    setLoading(true);
    await PATCH('notes/' + props.id, state)
      .then(() => {
        return window.location.reload();
      })
      .catch((err) => {
        const status = err.response.status;
        setLoading(false);
        handleFetchError(status, 201, 'Failed to update note.', true);
      });
  };

  return (
    <Modal
      btnCloseClick={props.btnCloseClick}
      bgClick={props.bgClick}
      btnCloseVisiible={true}
    >
      <label>Title</label>
      <input
        maxLength={24}
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
      {loading && <Loading />}
      {fetchError.status && <Error message={fetchError.message} />}
    </Modal>
  );
};

export const UploadImageModal = (props: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const data = new FormData();

  const handleChange = (e: ChangeEvent<any>) => {
    const { target } = e;

    data.append('file', target.files[0]);
  };
  const { POST, handleFetchError, fetchError } = useFetch();

  const handleSubmit = async () => {
    setLoading(true);
    await POST('users/upload', true, data)
      .then((res) => {
        setLoading(false);
        return window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        handleFetchError(
          err.response.status,
          401,
          'You are not allowed to make these changes',
        );
        handleFetchError(
          err.response.status,
          201,
          'Failed to upload image',
          true,
        );
      });
  };

  return (
    <Modal btnCloseClick={props.btnCloseClick} btnCloseVisiible={true}>
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
      {loading && <Loading />}
      {fetchError.status && <Error message={fetchError.message} />}
    </Modal>
  );
};

export default Modal;
