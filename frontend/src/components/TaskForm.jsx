import { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

      body: JSON.stringify({
        title
      })
    });

    const data = await response.json();

    setMessage(data.message);

    //successful block
   if (response.ok) {
  setTitle("");
  setTasks((prevTasks) => [...prevTasks, data.task]);
}
  };

  return (
    <div>
      <h2>Add Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default TaskForm;