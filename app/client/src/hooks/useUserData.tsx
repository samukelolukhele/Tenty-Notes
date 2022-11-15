import React, { useState } from "react";
import useFetch from "./useFetch";
import { User } from "./types/@types.User";

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
      id: "",
      title: "",
      body: "",
      authorId: "",
      is_pinned: false,
      created_at: "",
      updated_at: "",
      author: {},
    },
  ]);
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    id: null,
    description: "",
    profile_image: "",
    full_name: "",
    note: [
      {
        id: "",
        title: "",
        content: "",
        is_pinned: false,
        authorId: "",
        created_at: "",
        updated_at: "",
      },
    ],
  });

  const { GET } = useFetch();

  const handleUserData = async () => {
    return await GET("users/profile", true)
      .then((res) => {
        return setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleDashboardData = async () => {
    handleUserData();
    await GET("/notes").then((res) => setNotes(res.data));
  };

  const handleProfileData = async (id: any) => {
    return await GET(`users/profile/${id}`, true)
      .then((res) => {
        return setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return {
    notes,
    user,
    handleDashboardData,
    handleProfileData,
    handleUserData,
  };
};

export default useUserData;
