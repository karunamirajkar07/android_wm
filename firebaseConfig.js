// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvFPpEzaYZSQcI_OxlE4AB1yGNaSIB9Io",
  authDomain: "iot-washing-machine.firebaseapp.com",
  projectId: "iot-washing-machine",
  databaseURL: "https://iot-washing-machine-default-rtdb.firebaseio.com/",
  storageBucket: "iot-washing-machine.firebasestorage.app",
  messagingSenderId: "227575603086",
  appId: "1:227575603086:web:8983666a459ff73ff44edf",
  measurementId: "G-3YRZ706L78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);