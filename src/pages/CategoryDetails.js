import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../categoryData";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return (
      <div className="text-center text-red-600 mt-10">
        Category not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D1FAE5] px-4 pt-20 pb-10">
      <button
        onClick={() => navigate("/groceries")}
        className="mb-6 text-[#14B8A6] underline"
      >
        ← Back to Categories
      </button>

      <h2 className="text-2xl font-bold text-[#111827] mb-4">
        {category.name} Options
      </h2>

      <ul className="bg-white rounded-xl shadow-md p-6 space-y-2">
        {category.items.map((item, index) => (
          <li
            key={index}
            className="text-[#065f46] font-medium border-b border-green-100 pb-2"
          >
            🛒 {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
