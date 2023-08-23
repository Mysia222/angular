import * as admin from 'firebase-admin';

const serviceAccount = require('../../serviceAccountKey.json');

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getFirestore, addDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { handleFirestoreError } from '../utils/errorHandler';
const firebaseConfig = {
    apiKey: 'AIzaSyAueqoql2dta1jZNk-e9FN2qYaVlnQg6eg',
    authDomain: 'cook-22497.firebaseapp.com',
    databaseURL: 'https://cook-22497-default-rtdb.firebaseio.com',
    projectId: 'cook-22497',
    storageBucket: 'cook-22497.appspot.com',
    messagingSenderId: '769049012711',
    appId: '1:769049012711:web:73e8d59e9675705e1af542',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log('user');
//         // ...
//     } else {
//         console.log('nooo');
//         // User is signed out
//         // ...
//     }
// });

export const firestore = getFirestore(firebaseApp);

export const getDocCollection = (name: string) => {
    return doc(collection(firestore, name));
};
export const getCollection = (name: string) => {
    return collection(firestore, name);
};

export const getDocByField = async (name: string, property: any, value: any) => {
    const usersRef = getCollection(name);

    // Create a query against the collection.
    const q = query(usersRef, where(property, '==', value));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    return querySnapshot.docs;
};

export const getDocById = async (collection: any, id: string) => {
    const docRef = doc(firestore, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const user = docSnap.data();
        return { email: user.email, username: user.username };
    } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
        return handleFirestoreError({});
    }
};

export const addDocument = async (collectionName: string, data: any) => {
    const successDoc = await addDoc(getCollection(collectionName), data);
    return await getDocById(collectionName, successDoc.id);
};

export const deleteDoc = (name: string) => {
    // return firestore.collection('users');
};
