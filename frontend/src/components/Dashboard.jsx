import UserStatus from "./UserStatus";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Dashboard({ user, setUser, tasks, setTasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-wrapper">

        <UserStatus
          user={user}
          setUser={setUser}
        />

        <section className="dashboard-header">
          <div>
            <span className="dashboard-label">MY WORKSPACE</span>

            <h1>Todo Dashboard</h1>

            <p>
              Organize your tasks and stay focused on what matters.
            </p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <strong>{tasks.length}</strong>
              <span>Total Tasks</span>
            </div>

            <div className="stat-card">
              <strong>{completedTasks}</strong>
              <span>Completed</span>
            </div>
          </div>
        </section>

        <TaskForm
          tasks={tasks}
          setTasks={setTasks}
        />

        <TaskList
          tasks={tasks}
          setTasks={setTasks}
        />

      </div>
    </main>
  );
}

export default Dashboard;