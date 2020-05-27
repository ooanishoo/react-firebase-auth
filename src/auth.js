import firebase, { auth } from "./firebase";
import { useState, useEffect } from "react";
import history from "./history";

export const confirmSignInWithEmailLink = async () => {
  return new Promise((resolve, reject) => {
    const url = window.location.href;
    console.log({ url });

    if (auth.isSignInWithEmailLink(url)) {
      alert("Passwordless sign in needs to happen");

      // Grab the email from localstorage
      var email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // User opened the link on a different device.
        // Ask the user for email again!
        email = window.prompt("Please provide your email for confirmation");
      }
      //Now signIn
      auth
        .signInWithEmailLink(email, url)
        .then((result) => {
          console.log({ result });
          const user = result.user;
          const person = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");

          resolve(person);
        })
        .catch((err) => reject(err))
        .finally(() => {
          // need to clear the url !
          //history.push("/");
        });
    }
  });
};

export async function signInWithEmailLink(email) {
  const url = window.location.href;

  return new Promise((resolve, reject) => {
    if (auth.isSignInWithEmailLink(url)) {
      // Grab the email from localstorage
      var email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // User opened the link on a different device.
        // Ask the user for email again!
        email = window.prompt("Please provide your email for confirmation");
      }
      auth
        .signInWithEmailLink(email, url)
        .then((result) => {
          console.log({ result });
          const user = result.user;
          const person = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          history.push("/dashboard");
          resolve(person);
        })
        .catch((err) => {
          console.log({ err });
          history.push("/");
          reject(err);
        });
      // .finally(() => {
      //   // need to clear the url !
      //   history.push("/");
      // });
    }
  });
}

export async function signUpWithEmailAndPassword({ email, password, name }) {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject("Email and password was not provided");
    }
    if (auth.currentUser) {
      return reject("A user is logged in. Please logout from dashboard first!");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log({ value });

        const user = value.user;
        if (!user) {
          reject();

          return;
        }

        const uid = user.uid;

        if (!uid) {
          reject();

          return;
        }
        const person = {
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
        };
        if (name) {
          user.updateProfile({
            displayName: name,
          });
        }

        resolve(person);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
}

export async function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject("Email and password was not provided");
    }
    if (auth.currentUser) {
      return reject("A user is logged in. Please logout from dashboard first!");
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log({ value });

        const user = value.user;
        if (!user) {
          reject();

          return;
        }
        const uid = user.uid;

        if (!uid) {
          reject();

          return;
        }

        const person = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        resolve(person);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
}

export async function sendSignInEmailLink(email) {
  return new Promise((resolve, reject) => {
    // Reject if email is not provided
    if (!email) {
      reject("Please provide a valid email address");
      return;
    }
    //Don't login if the user is logged in
    if (auth.currentUser) {
      reject("A user is currently logged in. Please logout first!");
      return;
    }
    const url = window.location.href;
    const dynamicUrl = url.slice(0, url.lastIndexOf("/"));
    console.log("-----------------------------");
    console.log({ dynamicUrl });
    console.log(process.env.PUBLIC_URL, "PUBLIC_URL");
    const URL = `${dynamicUrl}/sign-in-with-email-link`;
    console.log({ URL });
    const actionCodeSettings = {
      url: URL,
      handleCodeInApp: true,
    };
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        resolve();
      })
      .catch((err) => reject(err));
  });
}

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
      reject(
        "A user is already logged in. Please logout first to login with different email"
      );
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

export const sendEmailToResetPassword = async (email) => {
  return new Promise((resolve, reject) => {
    // Reject if email is not provided
    if (!email) {
      reject("Please provide a valid email address");
      return;
    }
    const url = window.location.href;
    const dynamicUrl = url.slice(0, url.lastIndexOf("/"));
    console.log("-----------------------------");
    console.log({ dynamicUrl });
    console.log(process.env.PUBLIC_URL, "PUBLIC_URL");
    const URL = `${dynamicUrl}/sign-in`;
    console.log({ URL });
    const actionCodeSettings = {
      url: URL,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => resolve("Email sent"))
      .catch((err) => reject(err));
  });
};

export const isLoggedIn = () =>
  new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });

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
        console.log("lets see how many times its called");
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
