import { useEffect, useState } from "react";
import api from "../services/api";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!newTask.trim()) return;
    await api.post("/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
        <div className="flex mb-4">
          <input
            className="flex-grow p-2 border border-gray-300 rounded-l"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
          />
          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm bg-red-400 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
