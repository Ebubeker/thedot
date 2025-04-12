import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz5s3wkuZWgjVSWk41PTZqABLTXUXxfQA",
  authDomain: "thedot-7b40b.firebaseapp.com",
  projectId: "thedot-7b40b",
  storageBucket: "thedot-7b40b.firebasestorage.app",
  messagingSenderId: "436212281476",
  appId: "1:436212281476:web:43fba3fc9eccb99f3b92d1",
  measurementId: "G-LNYEE0YB6L"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();

export { db, auth, storage };