// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABbp0dEH2YNVRUqWhdbcpYL6WGCQGYMUc",
    authDomain: "projectcv-ae1b9.firebaseapp.com",
    projectId: "projectcv-ae1b9",
    storageBucket: "projectcv-ae1b9.firebasestorage.app",
    messagingSenderId: "99282880989",
    appId: "1:99282880989:web:cea98836e014bb40f50e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };