import React from "react";
import { useSearchParams } from "react-router-dom";

const useGetSearchParams = (paramName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get(paramName) || "";

  return searchTerm;
};

export default useGetSearchParams;
