import { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function validate(){
    const {email, password} = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email){
        alert('there is no email')
    }else if(!emailRegex.test(email)){
        alert('Please enter valid email address!')
    }else if(!password){
        alert('enter password')
    }else if(password.length < 6){
        alert('password is too short')
    }
  }

  

  return (
    <>
      <form name="loginForm">
        <input 
        type="email" 
        name="email" 
        placeholder="email" 
        onChange={(e)=>{
            setLoginData((prev)=>({
                ...prev,
                email:e.target.value
            }))
            console.log(loginData)
        }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e)=>{
            setLoginData((prev)=>({
                ...prev,
                password: e.target.value
            }))
            console.log(loginData)
          }}
        />
      </form>
      <button onClick={validate} />

    </>
  );
}
