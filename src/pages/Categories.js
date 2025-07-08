import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../categoryData";


export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#D1FAE5] px-4 pt-20 pb-10">
      <h1 className="text-2xl font-bold text-center text-[#111827] mb-6">
        Grocery Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/groceries/${cat.id}`)}
            className="cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-200"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3 text-center text-[#14B8A6] font-semibold">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

