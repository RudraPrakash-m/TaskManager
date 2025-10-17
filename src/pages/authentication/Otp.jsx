import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useLocation();
  const location = useLocation();
  // console.log(location);
  
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // console.log(state);
  

  const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    const firstChar = user.slice(0,3);
    return `${firstChar}${"*".repeat(user.length - 2)}@${domain}`;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(otp==state[1].otp){

        const result = await axios.post("https://taskmanagerb-k9mv.onrender.com/api/otp",state[0])
        // console.log(result);
        alert("Registered Successfully")
        navigate("/login", {state:location.pathname})
      }else{
        alert("enter valid otp")
      }
      
      
    } catch (error) {
      console.log(error);
    }
    // console.log("OTP entered:", otp);
    // console.log(result);
    
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Enter OTP
        </h2>

        {state && (
          <p className="text-center text-gray-600 mb-6">
            An OTP has been sent to <span className="font-medium">{hideEmail(state[0].email)}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert("Resend OTP logic here")}
          >
            Resend
          </button>
        </p>
      </div>
    </section>
  );
};

export default Otp;
