export default function register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  function validate() {
    const { email, password } = registerData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("there is no email");
    } else if (!emailRegex.test(email)) {
      alert("Please enter valid email address!");
    } else if (!password) {
      alert("enter password");
    } else if (password.length < 6) {
      alert("password is too short");
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
