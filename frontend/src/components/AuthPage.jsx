import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function AuthPage({ setUser }) {
  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>MERN Todo App</h1>
        <p>Manage your tasks with a simple and secure workspace.</p>
      </div>

      <div className="auth-content">
        <div className="auth-section">
          <RegisterForm />
        </div>

        <div className="auth-section">
          <LoginForm setUser={setUser} />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;