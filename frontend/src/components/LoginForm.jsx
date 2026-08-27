import { useState } from "react";

function LoginForm ({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //LoginForm ko backend se connect karna
  const handleLogin = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    credentials: "include",

    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  console.log(data);

//Welcome, User without refresh update
  if (response.ok) {
  const userResponse = await fetch("http://localhost:3000/api/auth/me", {
    credentials: "include"
  });

  if (userResponse.ok) {
    const userData = await userResponse.json();
    setUser(userData.user);
  }
}
};




  return (
    <div>
      <h1>Login</h1>

      <form  onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;