import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Auth from "./auth/Auth";
import NavBar from "./components/Navigation/NavBar";
import Events from "./components/events/Events";
import SignUp from "./auth/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
