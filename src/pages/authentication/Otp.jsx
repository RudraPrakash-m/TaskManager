import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const otpRef = useRef();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
      return;
    }
    otpRef.current?.focus();
  }, [state, navigate]);

  if (!state) return null;

  const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    if (user.length <= 3) return `${user[0]}*@${domain}`;
    const firstChars = user.slice(0, 3);
    return `${firstChars}${"*".repeat(user.length - 3)}@${domain}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!/^\d{6}$/.test(otp)) {
      setErrorMsg("OTP must be 6 digits.");
      return;
    }

    setDisableButton(true);
    setLoading(true);

    try {
      if (otp.trim() === state[1].otp) {
        await axios.post(`${import.meta.env.VITE_URL}/otp`, state[0]);
        navigate("/login");
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
        setDisableButton(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Try again.");
      setDisableButton(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setErrorMsg("Resend OTP logic is not implemented yet.");
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
          <p className="text-red-500 font-medium text-center mb-2">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">OTP</label>
            <input
              type="text"
              ref={otpRef}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              required
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit OTP"
            />
          </div>

          <button
            type="submit"
            disabled={disableButton || loading}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={handleResend}
            disabled={disableButton}
          >
            Resend
          </button>
        </p>
      </div>
    </section>
  );
};

export default Otp;
