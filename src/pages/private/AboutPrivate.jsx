import React from "react";
import { useNavigate } from "react-router-dom";
import FooterPrivate from "../../components/private/FooterPrivate";

const AboutPrivate = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Section */}
      <section className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-6 py-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 text-center">
          About <span className="text-blue-600">WorkEasy</span>
        </h1>

        <p className="max-w-2xl text-center text-lg text-gray-600 mb-10">
          Task Manager is a simple yet powerful productivity app that helps you
          organize, prioritize, and manage your daily tasks efficiently. Whether
          it's personal goals, study schedules, or professional work — this tool
          helps you stay focused and in control every day.
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
      </section>

      <FooterPrivate />
    </>
  );
};

export default AboutPrivate;
