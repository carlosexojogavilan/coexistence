import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreateTaskForm from "../components/CreateTaskForm";

const CreateTaskScreen = ({ navigation }) => {
  const handleNewTask = (newTask) => {
    navigation.navigate({
      name: "HomeScreen",
      params: { task: newTask },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a new task</Text>
      <CreateTaskForm createNewTask={handleNewTask} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontFamily: "Inter-Bold",
    fontSize: 30,
    marginBottom: 16,
  },
});

export default CreateTaskScreen;
