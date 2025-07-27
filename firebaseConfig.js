// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASqi53mWcbYCBSo2JsrA1Xoh3aN2VOk-4",
  authDomain: "fylmtv-f9f51.firebaseapp.com",
  projectId: "fylmtv-f9f51",
  storageBucket: "fylmtv-f9f51.firebasestorage.app",
  messagingSenderId: "684332793821",
  appId: "1:684332793821:web:44743a2ddc8f528e5fc034",
  measurementId: "G-G2605D4652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

db.settings({
  ignoreUndefinedProperties: true
});