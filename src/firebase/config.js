import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5jbgvXoRLBwME_IVsJRqnZgT6mmyS3K4",
  authDomain: "inventory-management-8a021.firebaseapp.com",
  projectId: "inventory-management-8a021",
  storageBucket: "inventory-management-8a021.firebasestorage.app",
  messagingSenderId: "484767293878",
  appId: "1:484767293878:web:9cb55011760fab7d9be117",
};

const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);

// Export Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
