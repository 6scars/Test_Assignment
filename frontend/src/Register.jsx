import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(''); 
  const navigate = useNavigate();


  function validate() {
    const { email, password } = registerData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[A-Z]/;
    if (!email) {
      setError("there is no email");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter valid email address!");
      return false;
    } else if (!password) {
      setError("enter password");
      return false;
    } else if (password.length < 6) {
      setError("password is too short");
      return false;
    } else if (!passwordRegex.test(password)) {
      setError("password must contain atleast one uppercase letter");
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

        if(!response.ok){
          setError(data.message);
        }
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
      <p>{error}</p>
    </>
  );
}
