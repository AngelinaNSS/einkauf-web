// src/pages/Welcome.js
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-900 font-poppins">
      <img
        src="/logo.png" // Replace with your actual logo path
        alt="Einkauf Logo"
        className="w-32 h-32 mb-4"
      />
      <h1 className="text-4xl font-bold mb-8">Einkauf</h1>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
      >
        Continue
      </button>
    </div>
  );
}
