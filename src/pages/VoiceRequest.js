import { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function VoiceRequest() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognition = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    } else {
      recognition.current = new SpeechRecognition();
      recognition.current.lang = "en-US";
      recognition.current.interimResults = false;
      recognition.current.continuous = false;

      recognition.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopListening();
      };

      recognition.current.onend = () => {
        setListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (!recognition.current) return;
    setTranscript("");
    recognition.current.start();
    setListening(true);
  };

  const stopListening = () => {
    if (!recognition.current) return;
    recognition.current.stop();
    setListening(false);
  };

  const reset = () => {
    setTranscript("");
    setListening(false);
  };

  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    // Smarter item parsing
    const items = transcript
      .toLowerCase()
      .split(/[\s,]+and[\s,]+|,|\band\b|\bplus\b|\bund\b|\bsowie\b/g)
      .map((item) => item.trim())
      .filter((item) => item && item.length > 1);

    try {
      await addDoc(collection(db, "voiceRequests"), {
        original: transcript,
        createdAt: Timestamp.now(),
        parsedItems: items,
      });

      navigate("/grocery-list", { state: { items } });
    } catch (error) {
      console.error("Error saving voice request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#D1FAE5] px-4 pt-24 pb-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#111827] mb-6">Voice Grocery Request</h1>

      {!isSupported ? (
        <p className="text-red-600 text-center max-w-md">
          Your browser doesn't support speech recognition.
        </p>
      ) : (
        <>
          <div className="flex gap-4 mb-6">
            <button
              onClick={startListening}
              disabled={listening}
              className="bg-[#14B8A6] text-white px-5 py-2 rounded hover:bg-[#0f766e]"
            >
              🎤 {listening ? "Listening..." : "Start"}
            </button>
            <button
              onClick={stopListening}
              disabled={!listening}
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              🛑 Stop
            </button>
            <button
              onClick={reset}
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-600"
            >
              🔁 Reset
            </button>
          </div>

          <textarea
            className="w-full max-w-md border border-gray-300 rounded p-3 text-sm bg-white shadow"
            placeholder="Your grocery items will appear here..."
            rows={4}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={!transcript.trim()}
            className="mt-6 bg-[#F97316] text-white px-6 py-2 rounded hover:bg-orange-500"
          >
            ✅ Create Grocery List
          </button>
        </>
      )}
    </div>
  );
}



