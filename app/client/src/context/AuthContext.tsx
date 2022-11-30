import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { TokenProps } from '../hooks/types/@types.Token';
import { User } from '../hooks/types/@types.User';
import useFetch from '../hooks/useFetch';

interface AProps {
  children?: React.ReactNode;
  loggedInUser?: User;
  checkExpiration?: any;
}

export const AuthContext = createContext<AProps>({});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User>({
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
  const token = localStorage.getItem('token');

  const checkExpiration = async (token: any) => {
    if (!token) return;

    const decodedToken: TokenProps = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      await localStorage.removeItem('token');
      return window.location.reload();
    }
  };

  const handleLoggedInUser = async () => {
    axios
      .get('users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setLoggedInUser(res.data))
      .catch((err) => {
        if (err.response.status != 500 || 408 || 401) return;
        window.location.reload();
        return localStorage.removeItem('token');
      });
  };

  useEffect(() => {
    checkExpiration(token);
    handleLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ children, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
