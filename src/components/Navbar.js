import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/welcome" className="text-green-700 font-bold text-xl">
          Einkauf
        </Link>

        {/* Hamburger Toggle Button - shows only on small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu - hidden on small screens */}
        <div className="hidden md:flex space-x-6 text-green-900 font-medium">
          <Link to="/welcome">Home</Link>
          <Link to="/signup">Register</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/find-students">Find Students</Link>
          <Link to="/request-help">Request Help</Link>
          <Link to="/edit-profile" className="underline">
            Edit Profile
          </Link>
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 px-2 text-green-900 font-medium space-y-2">
          <Link to="/welcome" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            Register
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link to="/find-students" onClick={() => setIsOpen(false)}>
            Find Students
          </Link>
          <Link to="/request-help" onClick={() => setIsOpen(false)}>
            Request Help
          </Link>
          <Link to="/edit-profile" onClick={() => setIsOpen(false)}>
            Edit Profile
          </Link>
          <Link to="/privacy-policy" onClick={() => setIsOpen(false)}>
            Privacy Policy
          </Link>
        </div>
      )}
    </nav>
  );
}



