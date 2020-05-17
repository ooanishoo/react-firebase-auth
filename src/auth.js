import firebase from "./firebase";

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log({ user });
      const person = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      addUserToCollection(person);
      return person;
    })
    .catch((err) => console.log({ err }));
};

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
