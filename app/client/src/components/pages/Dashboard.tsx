import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';
import '../../styles/pages/dashboard/dashboard.css';
import { AiOutlineCamera, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import useLink from '../../hooks/useLink';
import useModal from '../../hooks/useModal';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Username from '../Username';
import { colours } from '../utils/colours';
import Pagination from '../Pagination';
import Loading, { PageLoading } from '../Loading';
import useData from '../../hooks/useData';
import { AuthContext } from '../../context/AuthContext';
import useHover from '../../hooks/useHover';

const Dashboard = () => {
  const [modalLoading, setModalLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  const {
    user,
    notes,
    page,
    refetchUser,
    refetchNotes,
    isLoadingNotes,
    isLoadingUser,
    isFetchingNotes,
    isFetchingUser,
    errorNotes,
    errorUser,
    handleNext,
    handlePrev,
  } = useData(loggedInUser?.id);

  const [noteContent, setNoteContent] = useState({
    id: '',
    title: '',
    body: '',
  });

  const { handleHover, hover } = useHover();

  const { handleModal, setModal } = useModal(
    {
      full_name: user && user.full_name,
      username: user && user.username,
      email: user && user.email,
      description: user && user.description,
    },
    {
      id: notes && noteContent.id,
      defaults: {
        title: notes ? noteContent.title : '',
        body: notes ? noteContent.body : '',
      },
    },
  );
  const handleLinkId = useLink();
  const { DELETE } = useFetch();
  const authRedirect = useAuthRedirect();

  const handleDelNote = async (id: string | number | undefined) => {
    setModal({
      status: true,
      type: 'Delete_Note',
      loading: modalLoading,
      //Handles the modal that pops up when the trash icon on a note is clicked
      delFunction: async () => {
        setModalLoading(true);
        await DELETE('notes', id)
          .then(() => {
            setModalLoading(false);
            window.location.reload();
          })
          .catch((err) => setModalLoading(false));
      },
    });
  };

  const handleEdit = (note: any) => {
    setModal({ status: true, type: 'Update_Note' });
    return setNoteContent(note);
  };

  useEffect(() => {
    authRedirect;
    refetchNotes();
    refetchUser();
  }, [page]);

  if (isLoadingUser) return <PageLoading colour={colours.tetiary} />;

  return (
    <div className="dashboard">
      {errorNotes && errorNotes.message}
      {errorUser && errorUser.message}

      <div>
        {handleModal()}
        <div className="bg-pattern"></div>
        <div className="container">
          <div className="profile">
            <div className="profile-container">
              <div className={hover ? 'profile-img hover' : 'profile-img'}>
                <AiOutlineCamera className="profile-img-logo" />
                {user?.profile_image && (
                  <img
                    onClick={() =>
                      setModal({ status: true, type: 'Upload_Image' })
                    }
                    onMouseOver={() => handleHover(true)}
                    onMouseOut={() => handleHover(false)}
                    src={`https://storage.googleapis.com/tentynotes/${user?.profile_image}`}
                  />
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name-container">
                  <h2 className="profile-name">{user?.full_name}</h2>
                  <Username
                    className="profile-username"
                    username={user?.username}
                    userId={user?.id}
                    route="dashboard/profile"
                  />
                  <div className="action-btns">
                    <button
                      className="btn btn-add-note btn-success"
                      onClick={() =>
                        setModal({ type: 'Add_Note', status: true })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                    <button
                      className="btn btn-edit-profile btn-tetiary"
                      onClick={() =>
                        setModal({ type: 'Update_User', status: true })
                      }
                    >
                      <HiOutlinePencil className="pencil-icon" />
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        setModal({ type: 'Change_Password', status: true })
                      }
                    >
                      Change Password
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() =>
                        setModal({ type: 'Delete_User', status: true })
                      }
                    >
                      Delete Profile
                    </button>
                  </div>
                </div>
                <p className="profile-description">{user?.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {!isLoadingNotes &&
              notes?.items?.map((note, i) => {
                return (
                  <Card
                    key={i + note?.title}
                    username={note?.author.username}
                    userId={note?.author.id}
                    route="dashboard/profile"
                    title={note?.title}
                    body={note?.body}
                    loggedInUserId={user?.id}
                    editClick={() => handleEdit(note)}
                    delClick={() => handleDelNote(note?.id)}
                    onClick={() => handleLinkId('note', note?.id)}
                  />
                );
              })}
          </div>
          {isLoadingNotes && <Loading colour={colours.primary} />}
          <Pagination
            currentPage={page}
            nextClick={() => handleNext(notes, page)}
            prevClick={() => handlePrev(notes, page)}
            nextPageLink={notes ? notes?.links?.next : ''}
            prevPageLink={notes ? notes?.links?.previous : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
