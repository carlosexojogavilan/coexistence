import { Text, View, StyleSheet, Pressable } from "react-native";
import CreateTaskForm from "../components/CreateTaskForm";

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const handleEditedTask = (editedTask) => {
    navigation.navigate({
      name: "HomeScreen",
      params: { editedTask: { id: task.id, ...editedTask } },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <CreateTaskForm
        name={task.name}
        description={task.description}
        editNewTask={handleEditedTask}
      />
      <Pressable
        onPress={() =>
          navigation.navigate({
            name: "HomeScreen",
            params: { deletedTask: task },
            merge: true,
          })
        }
        style={styles.dltTaskBtn}
      >
        <Text style={styles.dltTaskBtnText}>Delete task</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  taskName: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  taskDescription: {
    fontSize: 18,
  },
  dltTaskBtn: {
    marginTop: "auto",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "tomato",
  },
  dltTaskBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

export default TaskDetailsScreen;
