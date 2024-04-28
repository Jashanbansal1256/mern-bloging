// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBS_88_RFJ6aBUF_xxpfp5U13GZcTK1k3Q",
  authDomain: "mern-bloging.firebaseapp.com",
  projectId: "mern-bloging",
  storageBucket: "mern-bloging.appspot.com",
  messagingSenderId: "332966298561",
  appId: "1:332966298561:web:912a2d3beea86811122540"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);