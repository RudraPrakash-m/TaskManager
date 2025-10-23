import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional icon

const BackButton = ({ path = -1 }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="absolute top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;
