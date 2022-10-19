import React, { ChangeEvent, FormEvent, useReducer } from "react";

const useForm = (initialState: any) => {
  const reducer = (
    state: typeof initialState,
    payload: { field: string; value: string }
  ) => {
    return {
      ...state,
      [payload.field]: payload.value,
    };
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e: ChangeEvent<any>) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  return {
    state,
    bind: {
      onChange: handleChange,
    },
  };
};

export default useForm;
