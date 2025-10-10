import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"

import "./App.css";
import Login from "./Login";
import Register from "./Register";
import WelcomePage from "./WelcomePage";

function App() {
  const getUserInfo = () => {
    const token = localStorage.getItem("jwt");
    if(!token) return null;
    try{
      const decoded = jwtDecode(token);
      if(!decoded || !decoded.exp) return false;
      return decoded
    }catch(err){
      console.error("invalid token", err)
      return false;
    }
  };



  const [user, setUser] = useState(getUserInfo());


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/welcomePage" element={<WelcomePage user={user} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
