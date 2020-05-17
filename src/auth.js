import firebase from "./firebase";
import { useContext } from "react";
import { DispatchContext } from "./contexts";

export async function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const person = {
          name: user.displayName,
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
