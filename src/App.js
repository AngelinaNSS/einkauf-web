import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import Splash from "./pages/Splash2";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FindStudents from "./pages/FindStudents";
import RequestHelp from "./pages/RequestHelp";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import VoiceRequest from "./pages/VoiceRequest";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import GroceryList from "./pages/GroceryList";

import "./i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-poppins bg-green-50 text-green-900 relative">
        <TopRightControls />

        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="*" element={<NavbarWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

function TopRightControls() {
  const { i18n } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
        zIndex: 10000,
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#065f46",
        userSelect: "none",
      }}
      aria-label="Date time and language switcher"
    >
      <div>
        {now.toLocaleDateString()} {now.toLocaleTimeString()}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={`px-3 py-1 rounded cursor-pointer transition-colors duration-200 ${
            i18n.language === "en"
              ? "bg-[#14B8A6] text-white"
              : "bg-transparent text-green-900 hover:bg-green-100"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage("de")}
          className={`px-3 py-1 rounded cursor-pointer transition-colors duration-200 ${
            i18n.language === "de"
              ? "bg-[#14B8A6] text-white"
              : "bg-transparent text-green-900 hover:bg-green-100"
          }`}
        >
          DE
        </button>
      </div>
    </div>
  );
}

function NavbarWrapper() {
  return (
    <>
      <HamburgerMenu />
      <main className="flex-grow pt-20 pb-16 px-4">
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-students" element={<FindStudents />} />
          <Route path="/request-help" element={<RequestHelp />} />
          <Route path="/student/:studentId" element={<StudentProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/voicerequest" element={<VoiceRequest />} />
          <Route path="/groceries" element={<Categories />} />
          <Route path="/groceries/:categoryId" element={<CategoryDetails />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route
            path="*"
            element={
              <div className="text-center text-brown-600">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* ✅ Moved Footer Here */}
      <footer className="bg-white shadow-inner h-10 fixed bottom-0 left-0 right-0 flex items-center justify-center text-green-700 text-sm font-medium z-30">
        <span>© 2025 Einkauf All rights reserved.</span>
        <Link
          to="/privacy-policy"
          className="ml-2 underline hover:text-brown-600"
        >
          Privacy Policy
        </Link>
      </footer>
    </>
  );
}

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#F9FAFB",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        style={{
          fontSize: "1.5rem",
          cursor: "pointer",
          background: "none",
          border: "none",
          color: "#92400E",
        }}
      >
        {open ? "×" : "☰"}
      </button>

      {open && (
        <div style={{ marginTop: "1rem" }}>
          <Link to="/welcome" onClick={() => setOpen(false)} style={linkStyle}>
            Home
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)} style={linkStyle}>
            Register
          </Link>
          <Link to="/login" onClick={() => setOpen(false)} style={linkStyle}>
            Login
          </Link>
          <Link to="/find-students" onClick={() => setOpen(false)} style={linkStyle}>
            Find Students
          </Link>
          <Link to="/request-help" onClick={() => setOpen(false)} style={linkStyle}>
            Request Help
          </Link>
          <Link to="/edit-profile" onClick={() => setOpen(false)} style={linkStyle}>
            Edit Profile
          </Link>
          <Link to="/privacy-policy" onClick={() => setOpen(false)} style={linkStyle}>
            Privacy Policy
          </Link>
          <Link to="/groceries" onClick={() => setOpen(false)} style={linkStyle}>
            Grocery Categories
          </Link>
          <Link to="/voicerequest" onClick={() => setOpen(false)}>
            <button className="bg-[#14B8A6] text-white px-4 py-2 rounded mt-4 hover:bg-[#0f766e]">
              🎤 Use Voice to Request Help
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  display: "block",
  margin: "0.5rem 0",
  color: "#065f46",
};

