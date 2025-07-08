import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC1jrucfWivBEG-jvk98iMvngPBTOJinM",
  authDomain: "einkauf-web.firebaseapp.com",
  projectId: "einkauf-web",
  storageBucket: "einkauf-web.firebasestorage.app",
  messagingSenderId: "1020557952803",
  appId: "1:1020557952803:web:6c2a1d1f3bbe0033b76e96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

