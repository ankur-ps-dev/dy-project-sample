import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyDdLFQjyQgJ2qg11tMey6xhNPxGmIZ7v3Y",
  authDomain: "crwn-db-d679a.firebaseapp.com",
  projectId: "crwn-db-d679a",
  storageBucket: "crwn-db-d679a.appspot.com",
  messagingSenderId: "576382821014",
  appId: "1:576382821014:web:dc5dce1ceac69345e018b7",
  measurementId: "G-7139Y745ZK",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
