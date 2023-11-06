// Formik x React Native example
import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const RegisterForm = () => {
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        values.email,
        values.password
      );
      alert("User signed up succesfully");
    } catch (error) {
      alert(`There was an error signing up the new user:  ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleValidation = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={handleValidation}
      onSubmit={handleRegister}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.textInput}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && touched.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
          </View>
          <Pressable
            onPress={handleSubmit}
            style={styles.submitBtn}
            disabled={isSubmitting}
          >
            <Text style={styles.submitBtnText}>Register</Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    fontSize: 24,
    borderWidth: 1,
    padding: 12,
  },
  submitBtn: {
    borderWidth: 1,
  },
  submitBtnText: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "gray",
    paddingVertical: 12,
  },
  errorMessage: {
    color: "red",
    marginVertical: 4,
  },
});

export default RegisterForm;
