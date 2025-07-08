import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation();
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password) {
      setError(t("Please fill in all fields"));
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError(t("Password must be at least 6 characters"));
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: form.name });

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date(),
      });

      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 px-6"
      style={{ backgroundColor: "#D1FAE5", color: "#111827" }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#14B8A6]">
          {t("signup")}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("Full Name")}
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-[#14B8A6] focus:border-[#14B8A6] sm:text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("Email address")}
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-[#14B8A6] focus:border-[#14B8A6] sm:text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("Password")}
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-[#14B8A6] focus:border-[#14B8A6] sm:text-sm"
              />
            </div>

            {/* Role */}
            <fieldset>
              <legend className="text-sm font-medium text-gray-700">
                {t("Select your role")}
              </legend>
              <div className="mt-2 flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleChange}
                    className="form-radio text-[#14B8A6]"
                  />
                  <span className="ml-2 text-gray-700">{t("Student")}</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Requester"
                    checked={form.role === "Requester"}
                    onChange={handleChange}
                    className="form-radio text-[#14B8A6]"
                  />
                  <span className="ml-2 text-gray-700">{t("Requester")}</span>
                </label>
              </div>
            </fieldset>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent
                rounded-md shadow-sm text-white bg-[#14B8A6] hover:bg-[#0D9488]
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14B8A6]"
              >
                {loading ? t("Signing up...") : t("Sign Up")}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t("Already have an account?")}{" "}
            <a
              href="/login"
              className="font-medium text-[#F97316] hover:text-[#EA580C]"
            >
              {t("Log in here")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


