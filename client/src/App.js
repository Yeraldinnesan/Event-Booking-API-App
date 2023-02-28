import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Auth from "./auth/Auth";
import NavBar from "./components/Navigation/NavBar";
import Events from "./components/events/Events";
import SignUp from "./auth/SignUp";
import Bookings from "./components/bookings/Bookings";

import { AuthContext } from "./contexts/authContext";

function App() {
  const authContext = useContext(AuthContext);

  const login = (token, userId, user) => authContext.login(token, userId, user);

  const logout = () => authContext.logout();

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
