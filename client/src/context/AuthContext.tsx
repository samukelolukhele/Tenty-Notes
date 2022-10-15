import axios from "axios";
import React, {
  useState,
  createContext,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { UseFetchTypes } from "../hooks/types/@types.useFetch";
import useFetch from "../hooks/useFetch";

interface AProps {
  children?: React.ReactNode;
  user?: React.MutableRefObject<{}>;
  loggedIn?: React.MutableRefObject<boolean>;
}

export const AuthContext = createContext<AProps>({});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = useRef(true);
  const user = useRef({});
  const { GETUSER } = useFetch<UseFetchTypes>("users/profile");

  useEffect(() => {
    const genLogIn = async () => {
      const token = localStorage.getItem("token");
      const userData = await GETUSER().then(
        (res) => (user.current = res?.data)
      );

      if (token) {
        if (userData.data === undefined || {}) {
          user.current = userData;
          loggedIn.current = true;
        }

        loggedIn.current = false;
        user.current = {};
      } else {
        loggedIn.current = true;
        user.current = {};
      }
    };

    genLogIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, children }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
