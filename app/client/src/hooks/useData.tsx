import { useQuery } from 'react-query';
import useFetch from './useFetch';
import { User } from './types/@types.User';
import { NoteObj } from './types/@types.NoteObj';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Note } from './types/@types.Note';

const useData = (profileId?: number | null, noteId?: number | null) => {
  const { GET } = useFetch();
  const { loggedInUser } = useContext(AuthContext);

  //Note pagination page
  const [page, setPage] = useState(1);

  //Defaults to logged in user.
  const fetchProfile = async () => {
    return GET(`users/profile/${profileId}`, true);
  };

  const fetchNotes = async () => {
    return GET(`notes?page=${page} `);
  };

  const fetchNote = async () => {
    return GET(`notes/${noteId}`);
  };

  const fetchUser = async () => {
    return GET('users/profile', true);
  };

  const fetchProfileNotes = async () => {
    return GET(`notes/notes-by-user/${profileId}?page=${page}`);
  };

  const {
    data: profileNotes,
    isLoading: isLoadingProfileNotes,
    isFetching: isFetchingProfileNotes,
    error: errorProfileNotes,
    refetch: refetchProfileNotes,
  } = useQuery<NoteObj, Error>(
    ['notes-by-profile', page],
    () => fetchProfileNotes(),
    {
      enabled: false,
    },
  );

  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    error: errorUser,
    refetch: refetchUser,
  } = useQuery<User, Error>('user', fetchUser, { enabled: false });

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    error: errorProfile,
    refetch: refetchProfile,
  } = useQuery<User, Error>('profile', () => fetchProfile(), {
    enabled: false,
  });

  const {
    data: notes,
    isFetching: isFetchingNotes,
    isLoading: isLoadingNotes,
    error: errorNotes,
    refetch: refetchNotes,
  } = useQuery<NoteObj, Error>(['notes', page], () => fetchNotes(), {
    enabled: false,
  });

  const {
    data: note,
    isFetching: isFetchingNote,
    isLoading: isLoadingNote,
    error: errorNote,
    refetch: refetchNote,
  } = useQuery<Note, Error>(['notes', page], () => fetchNote(), {
    enabled: false,
  });

  const handleNext = (notes: NoteObj | undefined, page: number) => {
    return (
      notes?.meta?.totalPages != page &&
      setPage(notes ? notes.meta.currentPage + 1 : page + 1)
    );
  };

  const handlePrev = (notes: NoteObj | undefined, page: number) => {
    return page >= 1 && setPage(notes ? notes.meta.currentPage - 1 : page - 1);
  };

  return {
    user,
    profile,
    profileNotes,
    notes,
    note,
    page,
    isLoadingNotes,
    isLoadingNote,
    isLoadingUser,
    isLoadingProfile,
    isLoadingProfileNotes,
    isFetchingNotes,
    isFetchingNote,
    isFetchingProfile,
    isFetchingProfileNotes,
    isFetchingUser,
    errorUser,
    errorNote,
    errorNotes,
    errorProfile,
    errorProfileNotes,
    handleNext,
    handlePrev,
    refetchUser,
    refetchNotes,
    refetchNote,
    refetchProfile,
    refetchProfileNotes,
  };
};

export default useData;
