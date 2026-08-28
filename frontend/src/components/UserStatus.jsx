import { useEffect } from "react";

function UserStatus({ user, setUser }) {

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    };

    getCurrentUser();
  }, [setUser]);


  




  const handleLogout = async () => {
  const response = await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include"
  });

  if (response.ok) {
    setUser(null);
  }
};
  return (
  <div className="user-status">
    <div className="user-profile">
      <div className="user-avatar">
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      <div className="user-details">
        <span>Welcome back</span>
        <h3>{user?.name}</h3>
      </div>
    </div>

    <button
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
);
}

export default UserStatus;