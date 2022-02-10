import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYuraQBnBk8T76PdXaKK4_b2fxaCMPnUo",
  authDomain: "wordle-with-friends-59dcd.firebaseapp.com",
  projectId: "wordle-with-friends-59dcd",
  storageBucket: "wordle-with-friends-59dcd.appspot.com",
  messagingSenderId: "89841846706",
  appId: "1:89841846706:web:b827efae159f1f3172bcab",
  measurementId: "G-505G9LP6TL"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
