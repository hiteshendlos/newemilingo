import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config/Contants";

const firebaseApp = initializeApp(firebaseConfig);
const firebase = getAuth(firebaseApp);

export default firebase;


// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { firebaseConfig } from "../config/Contants";
// import { firebaseConfig } from "../config/Constants";

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// // Configure Firebase Authentication with Google sign-in provider
// const provider = new GoogleAuthProvider();

// // Define additional scopes for Google Calendar
// provider.addScope("https://www.googleapis.com/auth/calendar");

// // Set the provider for signing in
// auth
//   .signInWithPopup(provider)
//   .then((result) => {
//     // User signed in successfully
//     // Access token with the necessary scope will be available in `result.credential.accessToken`
//   })
//   .catch((error) => {
//     // An error occurred during sign-in
//     console.error("Error signing in:", error);
//   });

// export default auth;




// const firebaseApp = initializeApp(firebaseConfig);
// const firebase = getAuth(firebaseApp);

// // Configure Firebase Authentication with Google sign-in provider
// const provider = new GoogleAuthProvider();

// // Define additional scopes for Google Calendar
// provider.addScope("https://www.googleapis.com/auth/calendar");

// // Prompt the user to sign in with the added scopes

// export default firebase;

