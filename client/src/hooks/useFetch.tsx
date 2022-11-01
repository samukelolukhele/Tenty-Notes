import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface FProps {
  url: string;
  method: Methods;
  body: any;
  authRequired: boolean;
}
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const useFetch = <T,>({
  url,
  method,
  body = null,
  authRequired = false,
}: FProps) => {
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

  const fetchData = () => {
    axios[method](url, authRequired ? authHeaders : undefined, body)
      .then((res) => {
        handleFetchError(res.status, 401, "Login credentials are incorrect.");
        handleFetchError(res.status, 200, "Failed to login", true);

        return setResponse(res);
      })
      .catch((err) => setError(err))
      .finally(() => window.location.reload());
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, authRequired]);

  return { response, error, fetchError };
};

export default useFetch;
