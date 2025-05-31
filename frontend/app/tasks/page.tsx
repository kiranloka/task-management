"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      removeToken();
      router.push("/login");
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    const res = await api.post("/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const res = await api.put(`/tasks/${id}`, { completed: !task.completed });
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
  };

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      <div className="flex space-x-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleComplete(task.id)}
            className={`p-2 border rounded cursor-pointer ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
