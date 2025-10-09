import { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function validate() {
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[A-Z]/;

    if (!email) {
      alert("There is no email");
    } else if (!emailRegex.test(email)) {
      alert("Please enter valid email address!");
    } else if (!password) {
      alert("Enter password");
    } else if (password.length < 6) {
      alert("Password is too short");
    } else if (!passwordRegex.test(password)) {
      alert("Password must contain atleast one uppercase letter");
    }
  }

  return (
    <>
    <p>LOGIN PAGE</p>
      <form name="loginForm">
        <input
          type="email"
          name="email"
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
          onChange={(e) => {
            setLoginData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
            console.log(loginData);
          }}
        />
      </form>
      <button onClick={validate} />
    </>
  );
}
