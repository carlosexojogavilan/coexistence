import { View, Text, StyleSheet, Pressable } from "react-native";

const Task = ({ name, description, goToDetailsScreen }) => {
  return (
    <Pressable style={styles.container} onPress={goToDetailsScreen}>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Task;
