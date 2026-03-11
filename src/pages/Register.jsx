import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//simple password strength checker
const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0 || score === 1) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score === 2) return { label: "Fair", color: "bg-yellow-500", width: "w-2/4" };
  if (score === 3) return { label: "Good", color: "bg-blue-500", width: "w-3/4" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const strength = getStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({ email, password });
      toast.success("Account created! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password field */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Strength bar */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
                </div>
                <p className={`text-xs mt-1 font-medium ${
                  strength.label === "Weak" ? "text-red-500" :
                  strength.label === "Fair" ? "text-yellow-500" :
                  strength.label === "Good" ? "text-blue-500" : "text-green-500"
                }`}>
                  {strength.label} password
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 ${
                confirmPassword.length > 0 && confirmPassword !== password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {confirmPassword.length > 0 && confirmPassword !== password && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
            )}
            {confirmPassword.length > 0 && confirmPassword === password && (
              <p className="text-green-500 text-xs mt-1">Passwords match ✓</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
