import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const docRef = doc(db, "users", studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          alert("Student not found");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [studentId, navigate]);

  if (loading) {
    return <div className="p-6 text-center">Loading student info...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 font-poppins max-w-md mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-700 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-green-300 flex items-center justify-center text-white text-3xl font-bold mb-4">
            {student?.name ? student.name.charAt(0) : "?"}
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-green-900">{student?.name}</h2>
          <p className="text-gray-700 mb-1">{student?.email}</p>
          <p className="text-gray-600 italic mb-4">{student?.role || "Student"}</p>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <p><strong>Age:</strong> {student?.age || 22}</p>
          <p><strong>Phone:</strong> {student?.phone || 83947363}</p>
          <p><strong>Location:</strong> {student?.location || "Crescent Street"}</p>
          <p><strong>Availability:</strong> {student?.availability || "Monday, Wednesday, Thursday"}</p>
          <p><strong>Bio:</strong> {student?.bio || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}

