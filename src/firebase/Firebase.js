import { initializeApp } from "firebase/app"
import 'firebase/compat/auth'
import { getFirestore, collection, query, where, getDocs, addDoc, setDoc, doc, getDoc, deleteDoc, orderBy, limit } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID 
});

export const collectionf = collection;
export const queryf = query;
export const wheref = where;
export const getDocsf = getDocs;
export const addDocf = addDoc;
export const setDocf = setDoc;
export const docf = doc;
export const getDocf = getDoc;
export const deleteDocf = deleteDoc;
export const orderByf = orderBy;
export const limitf = limit;
export const db = getFirestore(firebaseApp);

export default firebaseApp;