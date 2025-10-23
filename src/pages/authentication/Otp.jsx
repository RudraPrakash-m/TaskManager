import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
      return;
    }
    inputRefs.current[0]?.focus();
  }, [state, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  if (!state) return null;

  const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    const firstChars = user.slice(0, 2);
    return `${firstChars}${"*".repeat(user.length - 2)}@${domain}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setErrorMsg("Please enter the 4-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      if (enteredOtp === state[1].otp) {
        await axios.post(`${import.meta.env.VITE_URL}/otp`, state[0]);
        navigate("/login");
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    setErrorMsg("OTP resent. Check your email.");
    // Implement real resend API call if backend supports it
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Enter OTP
        </h2>

        <p className="text-center text-gray-600 mb-6">
          An OTP has been sent to{" "}
          <span className="font-medium">{hideEmail(state[0].email)}</span>
        </p>

        {errorMsg && (
          <p className="text-red-500 text-center mb-2">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((val, idx) => (
              <input
                key={idx}
                type="text"
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                ref={(el) => (inputRefs.current[idx] = el)}
                maxLength={1}
                className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <button
            className={`text-blue-600 hover:underline ${resendTimer > 0 && "cursor-not-allowed"}`}
            onClick={handleResend}
            disabled={resendTimer > 0}
          >
            Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Otp;
