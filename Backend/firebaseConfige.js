const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };