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

const CreateTaskForm = ({ name, description, createNewTask, editNewTask }) => {
  const handleCreateTask = (values, { setSubmitting }) => {
    if (!name) createNewTask(values);
    else editNewTask(values);
  };

  const handleValidation = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ name: name || "", description: description || "" }}
      validate={handleValidation}
      onSubmit={handleCreateTask}
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
            <Text style={styles.label}>Name</Text>
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={styles.textInput}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorMessage}>{errors.name}</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Description</Text>
            <TextInput
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              style={styles.textInput}
              multiline
              numberOfLines={4}
            />
            {errors.description && touched.description && (
              <Text style={styles.errorMessage}>{errors.description}</Text>
            )}
          </View>
          <Pressable
            onPress={handleSubmit}
            style={styles.submitBtn}
            disabled={isSubmitting}
          >
            <Text style={styles.submitBtnText}>{`${
              name ? "Edit" : "Create"
            } Task`}</Text>
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

export default CreateTaskForm;
