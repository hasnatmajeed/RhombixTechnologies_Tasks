import { useEffect, useState } from "react";

function TaskList({ tasks, setTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        "http://localhost:3000/api/tasks",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    };

    getTasks();
  }, [setTasks]);

  // Complete / Incomplete Task
  const toggleTask = async (task) => {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${task._id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          completed: !task.completed,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === task._id ? data.task : item
        )
      );
    }
  };

  // Start Edit Mode
  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);

    setDeletingTaskId(null);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
  };

  // Save Edited Task
  const saveEdit = async (taskId) => {
    const cleanTitle = editTitle.trim();

    if (!cleanTitle) {
      return;
    }

    if (cleanTitle.length > 120) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/tasks/${taskId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          title: cleanTitle,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? data.task : task
        )
      );

      setEditingTaskId(null);
      setEditTitle("");
    }
  };

  // Open Delete Confirmation
  const startDelete = (taskId) => {
    setDeletingTaskId(taskId);

    setEditingTaskId(null);
    setEditTitle("");
  };

  // Cancel Delete
  const cancelDelete = () => {
    setDeletingTaskId(null);
  };

  // Delete Task
  const deleteTask = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );

      setDeletingTaskId(null);
    }
  };

  return (
    <section className="task-list-section">
      <div className="task-list-header">
        <div>
          <span className="section-label">
            YOUR TASKS
          </span>

          <h2>My Tasks</h2>

          <p>
            Track your progress and manage your work.
          </p>
        </div>

        <div className="task-progress">
          {
            tasks.filter(
              (task) => task.completed
            ).length
          }

          <span>
            {" "}
            / {tasks.length} completed
          </span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-tasks">
          <div className="empty-task-icon">
            ✓
          </div>

          <h3>No tasks yet</h3>

          <p>
            Add your first task above to get started.
          </p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map((task) => (
            <div
              className={`task-row ${
                task.completed
                  ? "task-row-completed"
                  : ""
              }`}
              key={task._id}
            >
              <div className="task-main">
                <button
                  className="task-check"
                  onClick={() =>
                    toggleTask(task)
                  }
                  aria-label="Toggle task"
                >
                  {task.completed ? "✓" : ""}
                </button>

                {editingTaskId === task._id ? (
                  <div className="inline-edit">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                      maxLength={120}
                      autoFocus
                    />

                    <button
                      className="save-edit-button"
                      onClick={() =>
                        saveEdit(task._id)
                      }
                    >
                      Save
                    </button>

                    <button
                      className="cancel-edit-button"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p>{task.title}</p>
                )}
              </div>

              {editingTaskId !== task._id && (
                <div className="task-actions">
                  {deletingTaskId === task._id ? (
                    <div className="delete-confirmation">
                      <span>Delete this task?</span>

                      <button
                        className="confirm-delete-button"
                        onClick={() =>
                          deleteTask(task._id)
                        }
                      >
                        Yes
                      </button>

                      <button
                        className="cancel-delete-button"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="task-edit-button"
                        onClick={() =>
                          startEdit(task)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="task-delete-button"
                        onClick={() =>
                          startDelete(task._id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;