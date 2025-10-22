import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
  // console.log(location.pathname);
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginBack=()=>{
    if(location.pathname==="/login"){
      navigate("/")
    }else{
      navigate(-1)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    console.log(import.meta.env.VITE_URL);
    
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_URL}/login`,formData)
      // console.log(data.token);

        localStorage.setItem("token", data.token)
        if (data.token) navigate("/dashboard");
      
    } catch (error) {
      // console.log(error.response);
      
      if(error.response?.status==404) alert("User Doesn't exists")

      else if(error.response?.status==401) alert("Password is incorrect")
      
    }
    // console.log(formData);
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-10 min-h-screen">
      {/* back button */}
      <button
        onClick={handleLoginBack}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        &larr; Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => alert("Forgot password clicked")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
