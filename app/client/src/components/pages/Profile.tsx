import React, { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineCamera } from 'react-icons/ai';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useFetch from '../../hooks/useFetch';
import useLink from '../../hooks/useLink';
import useModal from '../../hooks/useModal';
import useUserData from '../../hooks/useUserData';
import Card from '../Card';
import '../../styles/pages/profile/profile.css';
import useGetSearchParams from '../../hooks/useGetSearchParams';
import { AuthContext } from '../../context/AuthContext';
import { Grid } from 'react-loader-spinner';
import { colours } from '../utils/colours';
import Pagination from '../Pagination';
import Loading from '../Loading';

const Profile = () => {
  const [modalLoading, setModalLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);
  const { notes, noteMetadata, noteLinkData, user, handleProfileData } =
    useUserData();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noteContent, setNoteContent] = useState({
    id: '',
    title: '',
    body: '',
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
    },
  );
  const searchTerm = useGetSearchParams('id');
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

  const handleNext = () => {
    setLoading(true);
    return (
      noteMetadata.totalPages != page && setPage(noteMetadata.currentPage + 1)
    );
  };

  const handlePrev = () => {
    setLoading(true);

    return page >= 1 && setPage(noteMetadata.currentPage - 1);
  };

  const handleData = async () => {
    await handleProfileData(searchTerm, page).then(() => setLoading(false));
  };

  useEffect(() => {
    authRedirect;
    handleData();
  }, [page]);

  return (
    <div className="profile-page">
      {handleModal()}
      {!notes[0].id ? (
        <div className="loading-container">
          <Grid width={80} height={80} color={colours.primary} />{' '}
          <h3>Loading please wait...</h3>{' '}
        </div>
      ) : (
        <>
          <div className="profile">
            <div className="container profile-container">
              <div className="profile-img">
                <AiOutlineCamera className="profile-img-logo" />
                {user.profile_image && (
                  <img
                    src={`https://storage.googleapis.com/tentynotes/${user.profile_image}`}
                  />
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name-container">
                  <h2 className="profile-name">{user.full_name}</h2>
                  <p className="profile-username">@{user.username}</p>
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
                      <button
                        className="btn btn-tetiary"
                        onClick={() =>
                          setModal({ type: 'Update_User', status: true })
                        }
                      >
                        Edit Profile
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
                  ) : (
                    <></>
                  )}
                </div>
                <p className="profile-description">{user.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {notes.map((note: any, i) => {
              return (
                <Card
                  key={i + note.title}
                  username={user.username}
                  userId={user.id}
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
          {loading && <Loading colour={colours.primary} />}
          <Pagination
            currentPage={page}
            nextClick={handleNext}
            prevClick={handlePrev}
            nextPageLink={noteLinkData.next}
            prevPageLink={noteLinkData.previous}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
