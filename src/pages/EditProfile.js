import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    bio: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
      } else {
        setUser(firebaseUser);
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phone: data.phone || "",
            street: data.street || "",
            bio: data.bio || "",
          });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, formData, { merge: true });
      alert("✅ Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ There was an error updating your profile.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6 py-12 font-poppins"
      style={{ backgroundColor: "#D1FAE5", color: "#111827" }} // Light mint background
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#A7F3D0]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#14B8A6]">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "phone", "street", "bio"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field === "bio"
                  ? "Short Bio (Optional)"
                  : field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== "bio" && field !== "street"}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#14B8A6] focus:outline-none"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-[#14B8A6] text-white font-semibold rounded hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
