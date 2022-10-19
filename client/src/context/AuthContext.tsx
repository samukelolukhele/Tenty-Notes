import jwtDecode from "jwt-decode";
import React, { createContext, useEffect } from "react";

interface AProps {
  children?: React.ReactNode;
}

interface TokenProps {
  sub: number;
  exp: number;
  iat: number;
}

export const AuthContext = createContext<AProps>({});

const defaultUser = {
  email: null,
  id: null,
  username: null,
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const genLogIn = async (token: any) => {
    if (!token) return;

    const decodedToken: TokenProps = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now())
      return localStorage.removeItem("token");
  };
  useEffect(() => {
    genLogIn(token);
  }, []);

  return (
    <AuthContext.Provider value={{ children }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
