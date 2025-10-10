import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login({setUser}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [notify, setNotify] = useState("");
  const navigate = useNavigate();

  function validate() {
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setNotify("There is no email");
      return false;
    } else if (!emailRegex.test(email)) {
      setNotify("Please enter valid email address!");
      return false;
    } else if (!password) {
      setNotify("Enter password");
      return false;
    }
    return true;
  }

  async function login() {
    setNotify("");
    try {
      if (validate()) {
        const { email, password } = loginData;
        const response = await fetch("http://localhost:3001/api/loginUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data)
        setNotify(data.message);
        setUser({
          email: data.user.email
        });
        if (data.redirectTo) {
          navigate("/welcomePage");
        }
      }
    } catch (err) {
      console.log("login function error", err);
    }
  }

  return (
    <>
      <p>LOGIN PAGE</p>
      <form name="loginForm">
        <input
          type="email"
          name="email"
          autoComplete="current-email"
          placeholder="email"
          onChange={(e) => {
            setLoginData((prev) => ({
              ...prev,
              email: e.target.value,
            }));
            console.log(loginData);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={(e) => {
            setLoginData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
            console.log(loginData);
          }}
        />
      </form>
      <button onClick={login}>LOGIN</button>
      <p>{notify}</p>
    </>
  );
}
