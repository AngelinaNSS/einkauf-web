import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ backgroundColor: "#D1FAE5", color: "#111827" }}
    >
      {/* Logo */}
      <img
        src="/einkauflogo.png"
        alt="Einkauf App Logo"
        className="w-36 h-36 mb-6 rounded-full shadow-md border-4 border-white"
      />

      {/* Headings */}
      <h1 className="text-4xl font-extrabold mb-2 text-[#14B8A6]">
        Einkauf
      </h1>
      <p className="text-lg mb-6 text-[#14B8A6]">
        Helping hands for shopping!
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/welcome")}
        className="px-6 py-3 bg-[#14B8A6] text-white font-semibold rounded-lg hover:bg-[#0D9488] transition"
      >
        Next
      </button>
    </div>
  );
}


