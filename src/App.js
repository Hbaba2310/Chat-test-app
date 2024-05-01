import React from "react";
import "./App.css";

require("dotenv").config();

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Makes it easier to work with firebase & react
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "chat-app-9d8b5.firebaseapp.com",
  projectId: "chat-app-9d8b5",
  storageBucket: "chat-app-9d8b5.appspot.com",
  messagingSenderId: "1067431521487",
  appId: "1:1067431521487:web:b368b5f5c5abc0492ddbba",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

//function App() {
return (
  <div className="App">
    <header className="App-header"></header>
    <section>
      {user ? <ChatRoom /> : <SignIn />} //if user show ChatRoom else: show
      SignIn
    </section>
  </div>
);
//}

function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useSignInWithPopup(provider);
  }; // returns a popup window when user clicks on the button

  return <button onClick={useSignInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.SignOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages"); // referencing a firestore collection
  const query = messagesRef.orderBy("createdAt").limit(25); // querying documents with max of 25 (timestamp)

  const [messages] = useCollectionData(query, { idField: "id" }); //listening to data with a hook
}

export default App;
