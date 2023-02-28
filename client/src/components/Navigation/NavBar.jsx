import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/booking-icon-png-19.jpg";

const NavBar = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/home">
            <img width="50px" src={logo} alt="logo" /> <h2>Book it!</h2>{" "}
          </Link>
        </div>
        <nav>
          <ul>
            <NavLink to="/events">
              <li>Events</li>
            </NavLink>
            <li>Bookings</li>
            <li>
              <NavLink to="/auth">Log In</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
