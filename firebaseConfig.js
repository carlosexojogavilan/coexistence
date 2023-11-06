// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChrrx7mmQx2Dox37oWe89vFKflK7PxJfs",
  authDomain: "coexistence-84fa1.firebaseapp.com",
  projectId: "coexistence-84fa1",
  storageBucket: "coexistence-84fa1.appspot.com",
  messagingSenderId: "1028325453646",
  appId: "1:1028325453646:web:3bdb9942269c68364f381f",
  measurementId: "G-22ZKY7RNK5",
};

// Initialize Firebase

const initializedFirebaseApps = getApps();

const firebaseApp = initializedFirebaseApps.length
  ? getApp()
  : initializeApp(firebaseConfig);

export const FIREBASE_APP = firebaseApp;

const firebaseAuth = initializedFirebaseApps.length
  ? getAuth()
  : initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

export const FIREBASE_AUTH = firebaseAuth;
