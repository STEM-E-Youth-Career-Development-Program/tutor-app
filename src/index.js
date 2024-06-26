import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import reportWebVitals from './reportWebVitals';
import { FirebaseAppContext } from "./FirebaseAppContext";
import { firebaseApp } from './firebaseApp';
import { Provider } from 'react-redux';
import { store } from './state/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="305310074723-safj7miha1ftgqlou5l3l7iijss5839u.apps.googleusercontent.com">
        <React.StrictMode>
            <Provider store={store}>
                <FirebaseAppContext.Provider value={firebaseApp}>
                    <App />
                </FirebaseAppContext.Provider>
            </Provider>
        </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
