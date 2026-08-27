import { useEffect } from "react";

function TaskList({ tasks, setTasks }) {

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/api/tasks", {
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    };

    getTasks();
  }, [setTasks]);

  return (
    <div>
      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;