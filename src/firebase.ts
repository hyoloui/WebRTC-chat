// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClUPvZoQJ5G_9kSzYXHgc7YBGw12oMisc",
  authDomain: "nextjs-chat-aee05.firebaseapp.com",
  projectId: "nextjs-chat-aee05",
  storageBucket: "nextjs-chat-aee05.appspot.com",
  messagingSenderId: "906656669094",
  appId: "1:906656669094:web:2e54621036101e8e000367",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;
