import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';
import '../../styles/pages/dashboard/dashboard.css';
import { AiOutlineCamera, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import useLink from '../../hooks/useLink';
import useUserData from '../../hooks/useUserData';
import useModal from '../../hooks/useModal';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Username from '../Username';
import { Grid } from 'react-loader-spinner';
import { colours } from '../utils/colours';
import Pagination from '../Pagination';
import useGetSearchParams from '../../hooks/useGetSearchParams';
import Loading from '../Loading';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const { user, notes, handleDashboardData, noteMetadata, noteLinkData } =
    useUserData();
  const [noteContent, setNoteContent] = useState({
    id: '',
    title: '',
    body: '',
  });

  const [page, setPage] = useState(1);

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
    await handleDashboardData(page).then(() => setLoading(false));
  };

  useEffect(() => {
    authRedirect;
    handleData();
  }, [page]);

  return (
    <div className="dashboard">
      {handleModal()}
      {!user.id ? (
        <div className="loading-container">
          <Grid height={80} width={80} color={colours.primary} />
          <h3>Loading please wait...</h3>
        </div>
      ) : (
        <div>
          <div className="bg-pattern"></div>
          <div className="container">
            <div className="profile">
              <div className="profile-container">
                <div className="profile-img">
                  <AiOutlineCamera className="profile-img-logo" />
                  {user.profile_image && (
                    <img
                      onClick={() =>
                        setModal({ status: true, type: 'Upload_Image' })
                      }
                      src={`https://storage.googleapis.com/tentynotes/${user.profile_image}`}
                    />
                  )}
                </div>
                <div className="profile-info">
                  <div className="profile-name-container">
                    <h2 className="profile-name">{user.full_name}</h2>
                    <Username
                      className="profile-username"
                      username={user.username}
                      userId={user.id}
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
                  <p className="profile-description">{user.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              {notes.map((note, i) => {
                return (
                  <Card
                    key={i + note.title}
                    username={note.author.username}
                    userId={note.author.id}
                    route="dashboard/profile"
                    title={note.title}
                    body={note.body}
                    loggedInUserId={user.id}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
