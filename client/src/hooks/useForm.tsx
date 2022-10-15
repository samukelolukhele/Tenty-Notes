import React, { useState } from "react";

const useForm = <T,>(intialState: T) => {
  const [fields, setValues] = useState(intialState);

  return [
    fields,
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      setValues({
        ...fields,
        [name]: value,
      });
    },
  ];
};

export default useForm;
