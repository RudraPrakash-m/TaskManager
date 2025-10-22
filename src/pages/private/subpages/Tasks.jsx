import axios from "axios";
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Tasks = ({ reloadTrigger }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.user?.userId;

        if (!userId) throw new Error("Invalid token");
      } catch (error) {
        console.error("Invalid or corrupted token:", error);
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL}/alltasks`,
          { userId }
        );

        // Show only pending tasks
        const pendingTasks = data.filter((task) => !task.completed);

        // Sort by dueDate ascending
        pendingTasks.sort(
          (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

        setTasks(pendingTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, reloadTrigger]);

  const handleComplete = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL}/completedtasks`, { id });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to mark task as completed. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading tasks...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No pending tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
                  <p className="text-gray-700 mb-2">{task.description}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>Due: {dayjs(task.dueDate).format("DD MMM YYYY")}</div>
                  <div
                    className={`font-medium mt-1 ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleComplete(task._id)}
                className="mt-3 w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
