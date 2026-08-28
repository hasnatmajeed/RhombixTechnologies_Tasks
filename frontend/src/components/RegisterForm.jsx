import { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    setMessage(data.message);

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
  <div className="register-form-card">
    <div className="form-header">
      <h2>Create Account</h2>
      <p>Register to start managing your tasks.</p>
    </div>

    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="register-name">Name</label>

        <input
          id="register-name"
          type="text"
          placeholder="Enter your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="register-email">Email</label>

        <input
          id="register-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="register-password">Password</label>

        <input
          id="register-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)
            
          }
        />
      </div>

      <button className="auth-button" type="submit">
        Create Account
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

export default RegisterForm;