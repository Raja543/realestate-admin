import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDUnqAudEZCiiEeKr0wLlFhOOwD1RaqtCI",
  authDomain: "real-estate-f5d9c.firebaseapp.com",
  projectId: "real-estate-f5d9c",
  storageBucket: "real-estate-f5d9c.appspot.com",
  databaseURL:
    "https://real-estate-f5d9c-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "784322307430",
  appId: "1:784322307430:web:7a90f6b443c199ec0254a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const database = getDatabase(app);

export { db, auth, provider, database };
