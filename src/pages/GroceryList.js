import React from "react";
import { useLocation } from "react-router-dom";

export default function GroceryList() {
  const location = useLocation();
  const items = location.state?.items || [];

  return (
    <div className="min-h-screen bg-[#D1FAE5] px-4 pt-24 pb-10">
      <h2 className="text-2xl font-bold text-[#111827] mb-6 text-center">Your Grocery List</h2>

      {items.length === 0 ? (
        <p className="text-red-600 text-center">No items found. Please try again.</p>
      ) : (
        <ul className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-[#065f46] font-medium border-b border-green-100 pb-1"
            >
              🛒 {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

