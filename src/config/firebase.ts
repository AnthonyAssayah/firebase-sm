// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB-0jMT1gLpxAib8p6hroPUqrHZYgRjVg",
  authDomain: "react-course-cc427.firebaseapp.com",
  projectId: "react-course-cc427",
  storageBucket: "react-course-cc427.appspot.com",
  messagingSenderId: "788479411959",
  appId: "1:788479411959:web:bc40b525f9b4be65e635f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();            