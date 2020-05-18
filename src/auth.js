import firebase, { auth } from "./firebase";
import { useState, useEffect } from "react";

export async function loginWithProvider(providerId = "google.com") {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.OAuthProvider(providerId);
    // Reject if provider not found
    if (!provider) {
      reject();
      return;
    }
    //Don't login if the user is logged in
    if (auth.currentUser) {
      reject();
      return;
    }
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log({ user });
        const person = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        addUserToCollection(person);
        resolve(person);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
}

export const useIsLoggedIn = () => {
  const [val, setVal] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setVal(true);
    }
  });
  return val;
};

export const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  // onAuthStateChanged needs to be called inside useEffect
  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          const person = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          console.log({ person });
          setUser(person);
        }
      }),
    []
  );
  return user;
};

//Add loggedIn user to `users` collection
export async function addUserToCollection(user) {
  const db = firebase.firestore();
  const users = db.collection("users");
  try {
    await users.add(user);
  } catch (error) {
    console.log("User not added to collection");
  }
}
