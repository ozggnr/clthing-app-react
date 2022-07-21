// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  //creates an app instance, kind of config which allows us to attach the Firebase instance to that instance that we have online(in website)
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJuGMTsceyRnwhHDZoyV-j5gCl7u1imm0",
    authDomain: "clothing-db-b0c53.firebaseapp.com",
    projectId: "clothing-db-b0c53",
    storageBucket: "clothing-db-b0c53.appspot.com",
    messagingSenderId: "686512601183",
    appId: "1:686512601183:web:8898bc2d7eb1547ff983ea"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //this is a class that connected goggle auth itself

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid); //users is collection name
    const userSnapshot = await getDoc(userDocRef);
    
    //if user data doesn't exist, create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    //if user data exist,
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth)


//it's an open listener, it will wait until auth change, then it'll invoke the callback function
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)