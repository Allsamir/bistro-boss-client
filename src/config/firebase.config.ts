// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6oJYmpdYPwaMn-9lCHo7fKAvd6V6pRfI",
  authDomain: "bistro-boss-03.firebaseapp.com",
  projectId: "bistro-boss-03",
  storageBucket: "bistro-boss-03.appspot.com",
  messagingSenderId: "925998846757",
  appId: "1:925998846757:web:c686eca1ee25978a6580cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
