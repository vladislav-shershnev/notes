import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9WpIbvibz-zZ8kKB_4lvRqHJn_lCLJMA",
  authDomain: "noteballs-f0353.firebaseapp.com",
  projectId: "noteballs-f0353",
  storageBucket: "noteballs-f0353.appspot.com",
  messagingSenderId: "812405317626",
  appId: "1:812405317626:web:98218df8d601d87d9c8e43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}
