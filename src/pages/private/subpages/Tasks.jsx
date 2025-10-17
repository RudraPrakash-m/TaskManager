import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          "https://taskmanagerb-k9mv.onrender.com/api/alltasks",
          { userId }
        );
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, reloadTrigger]);

  if (loading) return <p className="p-6">Loading tasks...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>🗓 {task.dueDate}</span>
                <span
                  className={`font-medium ${
                    task.priority === "High"
                      ? "text-red-600"
                      : task.priority === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
