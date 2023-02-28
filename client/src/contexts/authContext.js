import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  token: null,
  userId: null,
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.token = localStorage.getItem("token");
    initialState.userId = decodedToken.userId;
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  token: null,
  userId: null,
  user: null,
  login: (token, userId, user) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token, userId, user) => {
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN",
      payload: { token, userId, user },
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        userId: state.userId,
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

// import React, { useReducer, createContext } from "react";
// import jwtDecode from "jwt-decode";

// const initialState = {
//   user: null,
// };

// if (localStorage.getItem("token")) {
//   const decodedToken = jwtDecode(localStorage.getItem("token"));

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("token");
//   } else {
//     initialState.user = decodedToken;
//   }
// }

// const AuthContext = createContext({
//   user: null,
//   userId: null,
//   login: (token, userId, tokenExpiration) => {},
//   logout: () => {},
// });

// function authReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         // ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }

// function AuthProvider(props) {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   const login = (token, userId, tokenExpiration) => {
//     localStorage.setItem("token", token, userId, tokenExpiration.toke);
//     dispatch({
//       type: "LOGIN",
//       payload: token, userId, tokenExpiration,
//     });
//   };
//   const logout = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT" });
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user: state.user, login, logout }}
//       {...props}
//     />
//   );
// }

// export { AuthContext, AuthProvider };
