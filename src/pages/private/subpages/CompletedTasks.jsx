import axios from "axios";
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompletedTasks = ({ reloadTrigger }) => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
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
          `${import.meta.env.VITE_URL}/getcompletedtasks`,
          { userId }
        );

        const completed = data.filter((task) => task.completed === true);
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [navigate, reloadTrigger]);

  if (loading) return <p className="p-6">Loading completed tasks...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Completed Tasks</h1>

      {completedTasks.length === 0 ? (
        <p className="text-gray-600">No completed tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedTasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 bg-green-50"
            >
              <h2 className="text-xl font-semibold mb-1 text-green-700">
                {task.title}
              </h2>
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

export default CompletedTasks;
