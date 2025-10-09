import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  function validate() {
    const { email, password } = registerData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[A-Z]/;
    if (!email) {
      alert("there is no email");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Please enter valid email address!");
      return false;
    } else if (!password) {
      alert("enter password");
      return false;
    } else if (password.length < 6) {
      alert("password is too short");
      return false;
    } else if (!passwordRegex.test(password)) {
      alert("password must contain atleast one uppercase letter");
      return false;
    }
    return true;
  }

  async function Register() {
    if (validate()) {
      const { email, password } = registerData;
      try {
        const response = await fetch("http://localhost:3001/api/registerUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        console.log(data);
        if(data.redirectTo){
          navigate(data.redirectTo)
        }
      } catch (err) {
        console.log("register function", err);
      }
    }
  }

  return (
    <>
      <p>REGISTER PAGE</p>
      <form name="registerForm">
        <input
          type="email"
          name="email"
          autoComplete="new-email"
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
          autoComplete="new-password"
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
      <button onClick={Register}> register</button>
    </>
  );
}
