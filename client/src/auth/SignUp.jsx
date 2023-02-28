import { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import useForm from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../apollo/mutations/auth";

import Swal from "sweetalert2";

import { validate } from "../utility/validations";

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [signUser, { error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    try {
      const { data } = await signUser({
        variables: {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });

      setIsSignedUp(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have signed up!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        timer: 2000,
      });
      console.log(error);
    }
    setLoading(false);
  };
  const { onChangeHandler, onSubmitHandler, values } = useForm(submitHandler, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="enter your name"
            name="firstName"
            value={values.firstName}
            onChange={onChangeHandler}
            onBlur={handleBlur}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="enter your name"
            name="lastName"
            value={values.lastName}
            onChange={onChangeHandler}
            onBlur={handleBlur}
            {...(errors.lastName && <span>{errors.lastName}</span>)}
          />
        </div>
        <div>
          <label>E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={onChangeHandler}
            onBlur={handleBlur}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={onChangeHandler}
            onBlur={handleBlur}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
