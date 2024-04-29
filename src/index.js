import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import reportWebVitals from './reportWebVitals';

// Firebase:
import { FirebaseAppContext } from "./FirebaseAppContext";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDE8_f9WmJHgfOeLClzmgwgP_liTvf4Ul0",
  authDomain: "stem-e-tutor-app-testing.firebaseapp.com",
  projectId: "stem-e-tutor-app-testing",
  storageBucket: "stem-e-tutor-app-testing.appspot.com",
  messagingSenderId: "305310074723",
  appId: "1:305310074723:web:e1256fd270efd038cbb556"
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="305310074723-safj7miha1ftgqlou5l3l7iijss5839u.apps.googleusercontent.com">
    <React.StrictMode>
      <FirebaseAppContext.Provider value={app}>
        <App />
      </FirebaseAppContext.Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
