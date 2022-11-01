import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const useFetch = <T,>() => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<any>();
  const [fetchError, setFetchError] = useState({
    status: false,
    message: "",
  });
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleFetchError = (
    status: number,
    desiredStatus: number,
    message: string,
    inverse = false
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

  const GET = async (
    route: string,
    authRequired = false
  ): Promise<any | AxiosResponse<any, any>> => {
    return await axios
      .get(route, authRequired ? authHeaders : undefined)
      .then((res) => {
        return res;
      })
      .catch((err) => err.message);
  };

  const POST = async (route: string, authRequired = false, body: any) => {
    return await axios
      .post(route, body, authRequired ? authHeaders : undefined)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const PATCH = async (route: string, body: any) => {
    return await axios
      .patch(route, body, authHeaders)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const DELETE = async (route: string, id = "") => {
    return await axios
      .delete(id == "" ? `${route}/${id}` : route, authHeaders)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const LOGIN = async (route: string, body: any) => {
    return await axios
      .post(route, body)
      .then((res) => {
        setResponse(res.status);
        return localStorage.setItem("token", res.data.access_token);
      })
      .catch((err) => setError(err));
  };

  const GETUSER = async (route: string, authRequired = false) => {
    return await axios(route, authRequired ? authHeaders : undefined)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log("error"));
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
    response,
    setFetchError,
  };
};

export default useFetch;
