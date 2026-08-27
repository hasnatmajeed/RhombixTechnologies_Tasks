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
    <div>
    {user ? (
      <div>
        <h2>Welcome, {user.name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    ) : (
      <p>No user logged in</p>
    )}
  </div>
    
  );
}

export default UserStatus;