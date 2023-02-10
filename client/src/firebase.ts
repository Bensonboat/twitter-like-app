// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcGbFDONo1tvJH-OScWVrEH8KHpYCoSdM",
  authDomain: "dappio-workshop-twitter.firebaseapp.com",
  projectId: "dappio-workshop-twitter",
  storageBucket: "dappio-workshop-twitter.appspot.com",
  messagingSenderId: "828188464985",
  appId: "1:828188464985:web:f86344e7974c8f6b17de48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
