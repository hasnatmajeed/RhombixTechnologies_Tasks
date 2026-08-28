import "./App.css";
import { useState } from "react";

import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  return user ? (
    <Dashboard
      user={user}
      setUser={setUser}
      tasks={tasks}
      setTasks={setTasks}
    />
  ) : (
    <AuthPage setUser={setUser} />
  );
}

export default App;