import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

import "dotenv/config";

const FirebaseContext = createContext(null);

const firebaseConfig = process.env.FIREBASE_KEY;

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

  const signUpUserEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password).catch(
      (error) => console.log("Error in Email and Passowrd Signup !! ..", error)
    );
  };

  const signInUserEmailAndPassword = (email, passowrd) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
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
      })
      .catch((error) => {
        console.log("Error in SignOut !! ..", error);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
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
