import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import FooterPrivate from "../../components/private/FooterPrivate";

const Dashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "User";
  let decoded = "";

  if (token) {
    try {
      decoded = jwtDecode(token);
      // console.log(decoded.user);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // console.log(decoded.user.userId);

  const handleAddTask = () => {
    navigate("/dashboard/addtask", { state: decoded.user.userId });
  };

  return (
    <>
      <div className="min-h-[calc(100vh-60px)] bg-gray-50 flex flex-col items-center justify-center p-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Welcome back, {decoded.user.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your daily tasks efficiently with{" "}
            <span className="font-semibold text-blue-600">WorkEasy</span>.
          </p>
        </div>

        {/* Add Task Section */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-md"
          >
            <PlusCircle size={22} />
            Add Task
          </button>
        </div>
      </div>

      <FooterPrivate />
    </>
  );
};

export default Dashboard;
