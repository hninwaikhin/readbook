import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBhqSAcOPKc_wH15fLmh8-b3ZupGAF4w-I",
    authDomain: "share-readbooks.firebaseapp.com",
    projectId: "share-readbooks",
    storageBucket: "share-readbooks.appspot.com",
    messagingSenderId: "184347086556",
    appId: "1:184347086556:web:dd37bb90d8b4623b182e19",
    measurementId: "G-B1QRKSQYDE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize service
const projectStorage = firebase.firestore();

const firebaseStorage = firebase.storage();

export { projectStorage, firebaseStorage };
