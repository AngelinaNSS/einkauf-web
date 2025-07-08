import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function TopRightControls() {
  const [now, setNow] = useState(new Date());
  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 20,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "0.4rem 0.8rem",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        zIndex: 10000,
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        color: "#065f46",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        minWidth: 120,
      }}
      aria-label="Date, time and language switcher"
    >
      {/* Date */}
      <div>{now.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</div>
      {/* Time */}
      <div style={{ fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>{now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
      
      {/* Language buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        {["en", "de"].map((lng) => (
          <button
            key={lng}
            onClick={() => changeLanguage(lng)}
            style={{
              backgroundColor: i18n.resolvedLanguage === lng ? "#14B8A6" : "transparent",
              color: i18n.resolvedLanguage === lng ? "#fff" : "#065f46",
              border: "1.5px solid #14B8A6",
              borderRadius: 4,
              padding: "2px 8px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              fontSize: 11,
              transition: "all 0.3s ease",
              userSelect: "none",
            }}
            aria-pressed={i18n.resolvedLanguage === lng}
            aria-label={`Switch language to ${lng === "en" ? "English" : "German"}`}
          >
            {lng}
          </button>
        ))}
      </div>
    </div>
  );
}
