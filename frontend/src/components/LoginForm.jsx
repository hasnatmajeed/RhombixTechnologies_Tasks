import { useState } from "react";

function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // LoginForm ko backend se connect karna
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    setMessage(data.message);

    // Welcome user without refresh
    if (response.ok) {
      setEmail("");
      setPassword("");

      const userResponse = await fetch(
        "http://localhost:3000/api/auth/me",
        {
          credentials: "include",
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();

        setUser(userData.user);
      }
    }
  };

  return (
    <div className="login-form-card">
      <div className="form-header">
        <h2>Welcome Back</h2>
        <p>Login to continue to your todo dashboard.</p>
      </div>

      <form className="auth-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-button" type="submit">
          Login
        </button>
      </form>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginForm;