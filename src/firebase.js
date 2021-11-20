import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAIuLneavs4qchVDbrdOnswNqZVlx-XCiI",
  authDomain: "crud-final-firestore.firebaseapp.com",
  projectId: "crud-final-firestore",
  storageBucket: "crud-final-firestore.appspot.com",
  messagingSenderId: "351878358448",
  appId: "1:351878358448:web:b11fe105380eaf9641a275",
  measurementId: "G-0T7J2T7B8Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
