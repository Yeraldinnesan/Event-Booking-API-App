import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../apollo/mutations/auth";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailEl = useRef();
  const passwordEl = useRef();

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-actions">
        <button type="submit">Log In</button>
        <Link to="/signup">
          <div type="button" onClick={switchModeHandler}>
            Sign Up
          </div>
        </Link>
      </div>
    </form>
  );
};

export default Auth;
