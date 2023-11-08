// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyChrrx7mmQx2Dox37oWe89vFKflK7PxJfs",
  authDomain: "coexistence-84fa1.firebaseapp.com",
  projectId: "coexistence-84fa1",
  storageBucket: "coexistence-84fa1.appspot.com",
  messagingSenderId: "1028325453646",
  appId: "1:1028325453646:web:3bdb9942269c68364f381f",
  measurementId: "G-22ZKY7RNK5",
};

// Initialize Firebase App

const initializedFirebaseApps = getApps();

const firebaseApp = initializedFirebaseApps.length
  ? getApp()
  : initializeApp(firebaseConfig);

export const FIREBASE_APP = firebaseApp;

// Initialize Firebase Auth

const firebaseAuth = initializedFirebaseApps.length
  ? getAuth()
  : initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

export const FIREBASE_AUTH = firebaseAuth;

// Initialize Firebase Firestore

export const db = getFirestore(firebaseApp);
