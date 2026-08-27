import { useState } from "react";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


import UserStatus from "./components/UserStatus";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <UserStatus user={user} setUser={setUser} />

          {user ? (
      <div>
        <h1>Todo Dashboard</h1>

        
        <TaskForm tasks={tasks} setTasks={setTasks}/>
          <TaskList tasks={tasks} setTasks={setTasks} />

      </div>


    ) : (
      <>
        <RegisterForm />
        <LoginForm setUser={setUser} />
        
      </>
    )}
    </div>
  );
}

export default App;