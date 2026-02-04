// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCiN5Nfkr2wqrE57jDHIOT5uaqtKv1MyNE',
  authDomain: 'shopopedia-64548.firebaseapp.com',
  projectId: 'shopopedia-64548',
  storageBucket: 'shopopedia-64548.firebasestorage.app',
  messagingSenderId: '788571576485',
  appId: '1:788571576485:web:5c5dfb4b4bcb174589554c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app as firebaseApp, db, auth }
