import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userid, setUserid] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    userId:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="email"){
      const emial_name = value.split("@")
      setUserid(emial_name[0])
    }
    setFormData({ ...formData, [name]: value,userId:`${userid}` });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
    try {

      setLoading(true)
      
      const {data} = await axios.post("https://taskmanagerb-k9mv.onrender.com/api/register",formData)
      console.log(data);
      
      navigate("/otp",{state:[formData,data]})
    } catch (error) {

      if(error.status==409){
        alert("User already exists")
      }
    } finally{
      setLoading(false)
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-2 min-h-screen">
      {/* Back button fixed top-left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        &larr; Back
      </button>

      {/* Form container */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

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
              Create Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter password"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Re-enter password"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {loading?"Registering...":"Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
