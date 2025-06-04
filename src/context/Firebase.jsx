import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut 
} from "firebase/auth";


const FirebaseContext = createContext(null);

import.meta.env.VITE_FIREBASE_KEY

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedIn = user ? true : false;
  console.log(user);
  
  const signUpUserEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password).catch(
      (error) => console.log("Error in Email and Passowrd Signup !! ..", error)
    );
  };

  const signInUserEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) =>
      console.log("Error in Email and Passowrd Signin !! ..", error)
    );
  };

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider).catch((error) =>
      console.log("Error in Google Signin !! ..", error)
    );
  };

  const logOutUser = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("Logged Out Successfully !!");
        setUser(null);
        
      })
      .catch((error) => {
        console.log("Error in SignOut !! ..", error);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signUpUserEmailAndPassword,
        signInUserEmailAndPassword,
        isLoggedIn,
        signInWithGoogle,
        logOutUser
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
