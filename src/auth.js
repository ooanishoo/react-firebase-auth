import firebase, { auth } from "./firebase";
import { useContext, useEffect } from "react";
import { DispatchContext } from "./contexts";
import { useState } from "react";

export async function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const person = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        //addUserToCollection(person);

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
    if (user) setVal(true);
    else setVal(false);
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

// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('profile');
// provider.addScope('email');
// firebase.auth().signInWithPopup(provider).then(function(result) {
//  // This gives you a Google Access Token.
//  var token = result.credential.accessToken;
//  // The signed-in user info.
//  var user = result.user;
// });
