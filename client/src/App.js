import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Auth from "../auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/events" element={null}></Route>
          <Route path="/bookings" element={null}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
