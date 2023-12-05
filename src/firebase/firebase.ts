import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

interface FirebaseApp {
  firestore: () => firebase.firestore.Firestore;
}

const firebaseConfig = {
  apiKey: "AIzaSyBHnCOGZn_vij4Yx76U5111HTORBdnpJ9k",
  authDomain: "task-management-23d19.firebaseapp.com",
  projectId: "task-management-23d19",
  storageBucket: "task-management-23d19.appspot.com",
  messagingSenderId: "1014924431",
  appId: "1:1014924431:web:1f286360e9bd2c59d89cfa",
  measurementId: "G-N5T7WSQ2VC"
};

const app: FirebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export { firestore };
