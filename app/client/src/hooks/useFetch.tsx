import axios, { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const useFetch = <T,>() => {
  const { checkExpiration } = useContext(AuthContext);
  const [fetchError, setFetchError] = useState({
    status: false,
    message: '',
  });
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const handleFetchError = (
    status: number,
    desiredStatus: number,
    message: string,
    inverse = false,
  ) => {
    if (
      (!inverse && status === desiredStatus) ||
      (inverse && status !== desiredStatus)
    ) {
      return setFetchError({
        status: true,
        message: message,
      });
    }
  };

  const token = localStorage.getItem('token');
  const checkJWT = () => token && checkExpiration(token);

  const GET = async (
    route: string,
    authRequired = false,
  ): Promise<any | AxiosResponse<any, any>> => {
    authHeaders && checkJWT();
    return await axios.get(route, authRequired ? authHeaders : undefined);
  };

  const POST = async (route: string, authRequired = false, body: any) => {
    authRequired && checkJWT();
    return await axios.post(
      route,
      body,
      authRequired ? authHeaders : undefined,
    );
  };

  const PATCH = async (route: string, body: any) => {
    return await axios.patch(route, body, authHeaders);
  };

  const DELETE = async (
    route: string,
    id: string | number | undefined = '',
  ) => {
    authHeaders && checkJWT();
    return await axios.delete(id ? `${route}/${id}` : route, authHeaders);
  };

  const LOGIN = async (
    route: string,
    body: any,
  ): Promise<AxiosResponse<any, any>> => {
    return await axios
      .post(route, body)
      .then((res) => {
        return localStorage.setItem('token', res.data.access_token);
      })
      .catch((err) => err);
  };

  const GETUSER = async (route: string, authRequired = false) => {
    return await axios(route, authRequired ? authHeaders : undefined)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log('error'));
  };

  return {
    GET,
    POST,
    PATCH,
    DELETE,
    GETUSER,
    LOGIN,
    handleFetchError,
    fetchError,
    setFetchError,
  };
};

export default useFetch;
