import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/booking-icon-png-19.jpg";

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header>
        <div>
          <Link to="/">
            <img width="50px" src={logo} alt="logo" /> <h2>Book it!</h2>{" "}
          </Link>
        </div>
        <nav>
          <ul>
            <NavLink to="/events">
              <li>Events</li>
            </NavLink>
            {token && (
              <NavLink to="/bookings">
                <li>Bookings</li>
              </NavLink>
            )}

            {!token ? (
              <>
                <NavLink to="/auth">
                  <li>Log In</li>
                </NavLink>
                <NavLink to="/signup">
                  <li>Sign Up</li>
                </NavLink>
              </>
            ) : (
              <li onClick={logOutHandler}>Log Out</li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
