import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../apollo/mutations/auth";

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loadin, setLoading] = useState(false);

  const firstNameEl = useRef();
  const lastNameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();

  const [signUser, { error }] = useMutation(CREATE_USER);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstName = firstNameEl.current.value;
    const lastName = lastNameEl.current.value;
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0
    ) {
      setIsSignedUp(false);
      return;
    }

    try {
      const { data } = await signUser({
        variables: {
          email,
          password,
          firstName,
          lastName,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="enter your name" ref={firstNameEl} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="enter your name" ref={lastNameEl} />
        </div>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={emailEl} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordEl} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
