import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";
import axios from "axios";

const Home = () => {

  const navigate = useNavigate()
  const fun=async()=>{
    const {data} = await axios.get("http://localhost:8080/api/")
    console.log(data);
  }

  const handleGetStarted=()=>{
    try {
      
      const token = localStorage.getItem("token")
      console.log(token);
      
      if(token){
        navigate("/dashboard")
        return
      } 
  
      navigate("/login")
    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(()=>{
    fun()
  },[])
  
  return (
    <section className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-6">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-blue-700">
        Organize Your Day with <span className="text-blue-600">Task Manager</span>
      </h1>

      <p className="text-center max-w-2xl text-lg text-gray-600 mb-8">
        Simplify your daily workflow with our smart to-do list app. Plan, prioritize, 
        and complete tasks efficiently — whether it’s work, study, or personal goals.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div className="flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-xl">
          <CheckCircleIcon className="text-blue-600 w-6 h-6" />
          <span className="font-medium">Create and manage tasks</span>
        </div>
        <div className="flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-xl">
          <CheckCircleIcon className="text-blue-600 w-6 h-6" />
          <span className="font-medium">Track your progress</span>
        </div>
        <div className="flex items-center gap-2 bg-white shadow-md px-5 py-3 rounded-xl">
          <CheckCircleIcon className="text-blue-600 w-6 h-6" />
          <span className="font-medium">Stay productive daily</span>
        </div>
      </div>

      <div className="flex gap-4">
        <NavLink
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </NavLink>
        <NavLink
          to="/about"
          className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
        >
          Learn More
        </NavLink>
      </div>
    </section>
  );
};

export default Home;
