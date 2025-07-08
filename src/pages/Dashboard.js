import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "student"));
        const snapshot = await getDocs(q);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#D1FAE5] px-4 py-12 text-[#111827] font-poppins">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-[#14B8A6]">
            Welcome back, Diana
          </h1>
          <p className="text-lg text-[#0f766e]">
            Let’s get you connected to your local helpers.
          </p>
        </div>

        {/* Profile and Tasks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#A7F3D0]">
            <h2 className="text-2xl font-semibold mb-2 text-[#14B8A6]">My Profile</h2>
            <p><strong>Name:</strong> Diana Baker</p>
            <p><strong>Age:</strong> 68</p>
            <p><strong>Pay:</strong> 20 per hour</p>
            <p><strong>Email:</strong> DianaB@example.com</p>
            <p><strong>Contact:</strong> 24789657</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#A7F3D0]">
            <h2 className="text-2xl font-semibold mb-2 text-[#14B8A6]">Things I Need Help With</h2>
            <p className="text-gray-700 mb-4">
              “Seeking grocery assistance 2–3 times weekly. Recurring support preferred.”
            </p>
            <button
              onClick={() => navigate("/grocery-list")}
              className="bg-[#14B8A6] hover:bg-[#0d9488] text-white px-4 py-2 rounded-lg transition"
            >
              Edit My Grocery List
            </button>
          </div>
        </div>

        {/* Available Students */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-[#14B8A6]">Available Students</h2>
          {students.length === 0 ? (
            <p className="text-gray-600">New students available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-[#A7F3D0] hover:shadow-md transition flex items-center justify-between w-full max-w-sm"
                >
                  <div>
                    <h3 className="text-lg font-bold">
                      {student.name || "Unnamed Student"}
                    </h3>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/student/${student.id}`)}
                    className="ml-4 px-3 py-1 text-sm bg-[#14B8A6] text-white rounded hover:bg-[#0d9488] transition"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

