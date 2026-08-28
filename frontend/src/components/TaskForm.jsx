import { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation add 

    if (!title.trim()) {
  setMessage("Task title is required");
  return;
}

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      credentials: "include",

     body: JSON.stringify({
      title: title.trim(),
    })
    });

    const data = await response.json();

    setMessage(data.message);

    //successful block
   if (response.ok) {
  setTitle("");

  setTasks((prevTasks) => [
    ...prevTasks,
    data.task,
  ]);
}
  };

 return (
  <section className="task-form-card">

    <div className="task-form-header">
      <div>
        <span className="section-label">NEW TASK</span>
        <h2>Add a Task</h2>
        <p>Add something you want to complete today.</p>
      </div>
    </div>

    <form
      className="task-create-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={120}
        />

      <button type="submit">
        Add Task
      </button>
    </form>

    {message && (
      <p className="task-message">
        {message}
      </p>
    )}

  </section>
);
}

export default TaskForm;