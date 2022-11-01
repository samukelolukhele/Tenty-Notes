import React, { useState } from "react";
import useFetch from "./useFetch";

interface UserProps {
  full_name: string;
  username: string;
  description: string;
  email: string;
  id: number | null;
  profile_image: string;
  note: [
    {
      title: string;
      body: string;
      isPinned: boolean;
      author: string;
    }
  ];
}

const useUserData = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [user, setUser] = useState<UserProps>({
    email: "",
    username: "",
    id: null,
    description: "",
    profile_image: "",
    full_name: "",
    note: [
      {
        title: "",
        body: "",
        isPinned: false,
        author: "",
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
