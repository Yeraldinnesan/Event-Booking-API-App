import { useState } from "react";

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    callback();
  };

  return { onChangeHandler, onSubmitHandler, values };
};

export default useForm;
