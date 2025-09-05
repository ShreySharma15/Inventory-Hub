import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyB5jbgvXoRLBwME_IVsJRqnZgT6mmyS3K4",
authDomain: "inventory-management-8a021.firebaseapp.com",
projectId: "inventory-management-8a021",
storageBucket: "inventory-management-8a021.firebasestorage.app",
messagingSenderId: "484767293878",
appId: "1:484767293878:cb55011760fab7d9be117",
};

const app = initializeApp(firebaseConfig);

// IMPORTANT: export db so other files can import it
export const db = getFirestore(app);