import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-60px)] bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-6 py-10 relative">

      {/* Back Button - just below navbar */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-[80px] left-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 text-center">
          About <span className="text-blue-600">WorkEasy</span>
        </h1>

        <p className="max-w-2xl text-center text-lg text-gray-600 mb-10">
          Task Manager is a simple yet powerful productivity app that helps you
          organize, prioritize, and manage your daily tasks efficiently.
        </p>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-[400px] text-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            Rudra Prakash Mallick
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Developer | Software Engineer | Passionate about building clean,
            efficient, and user-focused web applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
