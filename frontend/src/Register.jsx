import { useState } from "react";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  function validate() {
    const { email, password } = registerData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[A-Z]/;
    if (!email) {
      alert("there is no email");
    } else if (!emailRegex.test(email)) {
      alert("Please enter valid email address!");
    } else if (!password) {
      alert("enter password");
    } else if (password.length < 6) {
      alert("password is too short");
    } else if (!passwordRegex.test(password)) {
      alert("password must contain atleast one uppercase letter");
    }
  }

  return (
    <>
      <form name="registerForm">
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => {
            setRegisterData((prev) => ({
              ...prev,
              email: e.target.value,
            }));
            console.log(registerData);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => {
            setRegisterData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
            console.log(registerData);
          }}
        />
      </form>
      <button onClick={validate} />
    </>
  );
}
