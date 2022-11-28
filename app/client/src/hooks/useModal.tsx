import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UpdateUserModal,
  AddNoteModal,
  DeleteDialogueModal,
  UpdateNoteModal,
  UploadImageModal,
  ChangePasswordModal,
} from '../components/Modal';
import useFetch from './useFetch';

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

type ModalStateType = {
  type: string;
  status: boolean;
  loading?: boolean;
  delFunction?: () => Promise<void> | void | undefined;
};

const useModal = (
  userDefaults: UserDefaultOptionsType,
  noteDefaults: NoteDefaultOptionsType,
) => {
  const [modal, setModal] = useState<ModalStateType>({
    type: 'Update_User',
    status: false,
    delFunction: undefined,
    loading: false,
  });
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await DELETE('users', undefined)
        .then((res) => {
          setLoading(false);
          localStorage.removeItem('token');
          return nav('/');
        })
        .catch((err) => {
          setLoading(false);

          if (err.response.status != 202) {
            return setError({
              status: true,
              message: 'Failed to delete profile',
            });
          }
        });
    };

    if (modal.type == 'Change_Password')
      return (
        <ChangePasswordModal
          bgClick={handleClose}
          btnCloseClick={handleClose}
        />
      );

    if (modal.type == 'Upload_Image')
      return (
        <UploadImageModal bgClick={handleClose} btnCloseClick={handleClose} />
      );

    if (modal.type == 'Update_User')
      return (
        <UpdateUserModal
          defaults={userDefaults}
          btnCloseClick={handleClose}
          bgClick={handleClose}
        />
      );
    if (modal.type == 'Update_Note')
      return (
        <UpdateNoteModal
          id={noteDefaults?.id}
          defaults={noteDefaults?.defaults}
          btnCloseClick={handleClose}
          bgClick={handleClose}
        />
      );

    if (modal.type == 'Add_Note')
      return <AddNoteModal btnCloseClick={handleClose} bgClick={handleClose} />;

    if (modal.type == 'Delete_User')
      return (
        <DeleteDialogueModal
          onAccept={handleDelete}
          onCancel={handleClose}
          loading={loading}
          error={error.status}
          errorMessage={error.message}
          text="Deleting your profile will also delete all of your notes. Are you sure
          you want to delete your profile?"
        />
      );

    if (modal.type == 'Delete_Note')
      return (
        <DeleteDialogueModal
          onAccept={modal.delFunction}
          onCancel={handleClose}
          loading={loading}
          error={error.status}
          errorMessage={error.message}
          text="Are you sure
          you want to delete this note?"
        />
      );
  };

  return { handleModal, setModal, modal };
};

export default useModal;
