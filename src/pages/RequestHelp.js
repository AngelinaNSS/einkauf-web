import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RequestHelp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taskType: "groceries",
    description: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await addDoc(collection(db, "requests"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setLoading(false);
      setSuccess("✅ Request submitted successfully!");
      setForm({ taskType: "groceries", description: "", date: "", time: "" });
    } catch (err) {
      console.error("Error submitting request:", err);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-poppins"
      style={{ backgroundColor: "#D1FAE5", color: "#111827" }} // light mint + dark text
    >
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-[#A7F3D0]">
        <h2 className="text-2xl font-bold text-[#14B8A6] mb-6 text-center">
          Request Help
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Type</label>
            <select
              name="taskType"
              value={form.taskType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="groceries">Groceries</option>
              <option value="pharmacy">Pharmacy Pickup</option>
              <option value="postOffice">Post Office</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Please describe what you need help with..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#14B8A6] hover:bg-teal-700 text-white py-2 px-4 rounded-md transition"
            >
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <p className="text-[#14B8A6] text-sm text-center">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
