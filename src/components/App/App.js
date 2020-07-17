import React from "react";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import { Router } from "@reach/router";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Profile path="profile" />
      </Router>
    </div>
  );
}

export default App;
