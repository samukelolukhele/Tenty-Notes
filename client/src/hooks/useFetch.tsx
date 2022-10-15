import axios, { AxiosResponse } from "axios";

const useFetch = <T,>(route = "", authRequired = false, body?: any) => {
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const GET = async (): Promise<any | AxiosResponse<any, any>> => {
    return await axios
      .get(route, authRequired ? authHeaders : undefined)
      .then((res) => {
        return res;
      })
      .catch((err) => err.message);
  };

  const POST = async () => {
    return await axios
      .post(route, body, authRequired ? authHeaders : undefined)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const PATCH = async () => {
    return await axios
      .patch(route, body, authHeaders)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const DELETE = async () => {
    return await axios
      .delete(route, authHeaders)
      .then((res) => res)
      .catch((e) => e.message);
  };

  const LOGIN = async () => {
    return await axios
      .post(route, body)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        return res.data;
      })
      .catch((err) => err);
  };

  const GETUSER = async () => {
    return await axios(route, authHeaders)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log("error"));
  };

  return { GET, POST, PATCH, DELETE, GETUSER, LOGIN };
};

export default useFetch;
