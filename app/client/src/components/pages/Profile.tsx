import React, { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineCamera } from 'react-icons/ai';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useFetch from '../../hooks/useFetch';
import useLink from '../../hooks/useLink';
import useModal from '../../hooks/useModal';
import Card from '../Card';
import '../../styles/pages/profile/profile.css';
import useGetSearchParams from '../../hooks/useGetSearchParams';
import { AuthContext } from '../../context/AuthContext';
import { colours } from '../utils/colours';
import Pagination from '../Pagination';
import Loading, { PageLoading } from '../Loading';
import useData from '../../hooks/useData';
import useHover from '../../hooks/useHover';

const Profile = () => {
  const [modalLoading, setModalLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);
  const searchTerm = useGetSearchParams('id');
  const {
    profile: user,
    profileNotes: notes,
    page,
    refetchProfile,
    refetchProfileNotes,
    isLoadingProfileNotes,
    isLoadingProfile,
    errorProfile,
    errorProfileNotes,
    isFetchingProfile,
    handleNext,
    handlePrev,
  } = useData(Number(searchTerm));

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
      id: noteContent.id,
      defaults: {
        title: noteContent.title,
        body: noteContent.body,
      },
    },
  );
  const authRedirect = useAuthRedirect();
  const handleLinkId = useLink();

  const { DELETE } = useFetch();

  const handleEdit = (note: any) => {
    setModal({ status: true, type: 'Update_Note' });
    return setNoteContent(note);
  };

  const handleDelNote = async (id: string | number | undefined) => {
    setModal({
      status: true,
      type: 'Delete_Note',
      loading: modalLoading,
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

  useEffect(() => {
    authRedirect;
    refetchProfile();
    refetchProfileNotes();
  }, [page]);

  if (isLoadingProfile || isFetchingProfile) return <PageLoading />;

  return (
    <div className="profile-page">
      {handleModal()}

      <>
        <div className="profile">
          <div className="container profile-container">
            <div className={hover ? 'profile-img hover' : 'profile-img'}>
              <AiOutlineCamera className="profile-img-logo" />
              {user?.profile_image && (
                <img
                  onMouseOver={() => handleHover(true)}
                  onMouseOut={() => handleHover(false)}
                  src={`https://storage.googleapis.com/tentynotes/${user.profile_image}`}
                />
              )}
            </div>
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">{user?.full_name}</h2>
                <p className="profile-username">@{user?.username}</p>
                {loggedInUser?.id === Number(searchTerm) ||
                searchTerm === '' ? (
                  <div className="action-btns">
                    <button
                      className="btn btn-add-note btn-success"
                      onClick={() =>
                        setModal({ type: 'Add_Note', status: true })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className="profile-description">{user?.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {!isLoadingProfileNotes &&
            notes?.items.map((note: any, i) => {
              return (
                <Card
                  key={i + note.title}
                  username={note.author?.username}
                  userId={user?.id}
                  route="dashboard/profile"
                  title={note.title}
                  loggedInUserId={loggedInUser?.id}
                  body={note.body || 'Loading content...'}
                  editClick={() => handleEdit(note)}
                  delClick={() => handleDelNote(note.id)}
                  onClick={() => handleLinkId('note', note.id)}
                />
              );
            })}
        </div>
        {isLoadingProfileNotes && <Loading colour={colours.primary} />}
        {notes && notes?.items?.length > 0 ? (
          <Pagination
            currentPage={page}
            nextClick={() => handleNext(notes, page)}
            prevClick={() => handlePrev(notes, page)}
            nextPageLink={notes ? notes?.links.next : ''}
            prevPageLink={notes ? notes?.links.previous : ''}
          />
        ) : loggedInUser?.id === Number(searchTerm) ? (
          <p className="no-notes">You don't have any notes yet.</p>
        ) : (
          <p className="no-notes">This user doesn't have any notes yet.</p>
        )}
      </>
    </div>
  );
};

export default Profile;
