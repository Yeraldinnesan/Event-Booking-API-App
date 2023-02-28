import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../apollo/mutations/auth";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import useForm from "../utility/hooks";
import { validate } from "../utility/validations";

import Swal from "sweetalert2";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const submitHandler = async (e) => {
    setLoading(true);

    try {
      const { data } = await loginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      console.log(data);
      login(data.login.token, data.login.userId, data.login.user);
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(error);
    }

    setLoading(false);
  };

  const { onChangeHandler, onSubmitHandler, values } = useForm(submitHandler, {
    email: "",
    password: "",
  });
  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={onChangeHandler}
          onBlur={handleBlur}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChangeHandler}
          onBlur={handleBlur}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div className="form-actions">
        <button type="submit">Log In</button>
        <Link to="/signup">
          <div>Sign Up</div>
        </Link>
      </div>
    </form>
  );
};

export default Auth;
