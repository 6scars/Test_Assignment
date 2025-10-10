import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useState} from 'react';

import "./App.css";
import Login from "./Login";
import Register from "./Register";
import WelcomePage from "./WelcomePage";

function App() {
  const [user, setUser] = useState({email:''});

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/welcomePage" element={<WelcomePage user={user} />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
