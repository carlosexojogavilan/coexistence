import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Page</Text>
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
  },
});

export default RegisterScreen;
