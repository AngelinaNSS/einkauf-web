import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, limit, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useTranslation } from "react-i18next";

export default function FindStudents() {
  const db = getFirestore(app);
  const { t } = useTranslation();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      setError("");

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "student"), limit(8));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setStudents([]);
          setError(t("no_students_found"));
        } else {
          const studentsData = [];
          querySnapshot.forEach((doc) => {
            studentsData.push({ id: doc.id, ...doc.data() });
          });
          setStudents(studentsData);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(t("error_loading_students"));
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [db, t]);

  const bestMatch = students.length > 0 ? students[0] : null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#D1FAE5] min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-[#14B8A6] text-center">
        {t("Your recommended student Match list")}
      </h1>

      {loading && <p className="text-center text-[#111827]">{t("loading_students")}</p>}

      {!loading && error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && students.length === 0 && (
        <p className="text-center text-gray-700">{t("no_students_available")}</p>
      )}

      {!loading && !error && bestMatch && (
        <section
          className="mb-12 bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto border-4 border-[#F97316] relative"
          aria-label={t("best_match_aria_label", { name: bestMatch.name })}
        >
          <div className="flex items-center space-x-6">
            <img
              src={bestMatch.photoURL || "https://placekitten.com/120/120"}
              alt={`${bestMatch.name} profile`}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#14B8A6]"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#14B8A6]">{bestMatch.name}</h2>
              <p className="italic text-gray-700 mb-2">{bestMatch.bio || t("no_bio")}</p>
              <p className="font-semibold text-[#F97316]">
                {t("My Rates")}: €{"13 /hour" ?? t("rate_na")} {t("per_shop")}
              </p>
              <button
                className="mt-4 px-4 py-2 rounded bg-[#14B8A6] text-white font-semibold hover:bg-[#0d9488] transition"
                onClick={() => alert(t("Saved to liked students page", { name: bestMatch.name }))}
              >
                ❤️ 
              </button>
            </div>
            <span className="absolute top-2 right-2 bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {t("best match")}
            </span>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {students.slice(1).map((student) => (
          <article
            key={student.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer"
            aria-label={t("student_profile_aria_label", { name: student.name })}
          >
            <img
              src={student.photoURL || "https://placekitten.com/100/100"}
              alt={`${student.name} profile`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[#14B8A6]"
            />
            <h3 className="text-lg font-bold text-[#14B8A6] text-center">{student.name}</h3>
            <p className="text-gray-600 text-sm mb-2 text-center">{student.bio || t("no_bio")}</p>
            <p className="font-semibold text-center text-[#F97316]">
              {t("My Rates")}: €{"14/hour" ?? t("rate_na")} / {t("per_shop")}
            </p>
            <button
              className="mt-3 w-full bg-[#14B8A6] text-white py-2 rounded hover:bg-[#0d9488] transition"
              onClick={() => alert(t("saved to liked students page", { name: student.name }))}
            >
              ❤️ 
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
