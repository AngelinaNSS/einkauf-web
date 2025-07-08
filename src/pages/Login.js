import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#D1FAE5" }}
    >
      {/* ✅ Logo & App Name */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/einkauflogo.png"
          alt="Einkauf Logo"
          className="w-36 h-36 mb-4 rounded-full shadow-md border-4 border-white"
        />
        <h1 className="text-3xl font-bold text-[#14B8A6]">Einkauf</h1>
      </div>

      {/* ✅ Login Card */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center text-[#111827] mb-4">
          Log in to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#14B8A6] hover:bg-[#F97316] text-white font-semibold py-3 rounded-md transition"
          >
            Log In
          </button>
          {message && (
            <p className="text-center text-sm text-red-500 mt-1">{message}</p>
          )}
        </form>
        <p className="mt-4 text-center text-gray-700 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#14B8A6] underline hover:text-[#F97316]"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

