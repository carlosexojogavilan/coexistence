import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import UnauthenticatedTabs from "./navigation/UnauthenticatedTabs";
import { useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? <Tabs /> : <UnauthenticatedTabs />}
    </NavigationContainer>
  );
}
