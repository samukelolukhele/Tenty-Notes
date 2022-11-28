import React, { useState } from 'react';
import useFetch from './useFetch';
import { User } from './types/@types.User';

interface Note {
  id: string | number;
  title: string;
  body: string;
  authorId: number | string;
  is_pinned: boolean;
  created_at: number | string;
  updated_at: number | string;
  author: any;
}

const useUserData = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '',
      title: '',
      body: '',
      authorId: '',
      is_pinned: false,
      created_at: '',
      updated_at: '',
      author: {},
    },
  ]);
  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    id: null,
    description: '',
    profile_image: '',
    full_name: '',
    note: [
      {
        id: '',
        title: '',
        content: '',
        is_pinned: false,
        authorId: '',
        created_at: '',
        updated_at: '',
      },
    ],
  });
  const [noteMetadata, setNoteMetadata] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [noteLinkData, setNoteLinkData] = useState({
    first: '',
    previous: '',
    next: '',
    last: '',
  });

  const { GET } = useFetch();

  const handleUserData = async () => {
    return await GET('users/profile', true)
      .then((res) => {
        return setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleProfileUserData = async (id: number | string) => {
    return await GET(`users/profile/${Number(id)}`)
      .then((res) => {
        return setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleDashboardData = async (page: string | number) => {
    handleUserData();
    await GET(`/notes?page=${page}`)
      .then((res) => {
        setNoteLinkData(res.data.links);
        setNoteMetadata(res.data.meta);
        setNotes(res.data.items);
      })
      .catch((err) => console.log(err.message));
  };

  const handleProfileData = async (
    id: number | string,
    page: string | number,
  ) => {
    handleProfileUserData(Number(id));
    return await GET(`notes/notes-by-user/${id}?page=${Number(page)}`, true)
      .then((res) => {
        setNoteLinkData(res.data.links);
        setNoteMetadata(res.data.meta);
        return setNotes(res.data.items);
      })
      .catch((err) => console.log(err.message));
  };

  return {
    notes,
    noteMetadata,
    noteLinkData,
    user,
    handleDashboardData,
    handleProfileData,
    handleUserData,
  };
};

export default useUserData;
