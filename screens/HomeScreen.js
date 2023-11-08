import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import Task from "../components/Task";

import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);

  const addNewTask = async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        name: newTask.name,
        description: newTask.description,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    if (route.params?.task) {
      setTasks([...tasks, route.params.task]);
      addNewTask(route.params?.task);
    }
  }, [route.params?.task]);

  useEffect(() => {
    if (route.params?.deletedTask) {
      const newTasks = tasks.filter(
        (task) => task.name !== route.params.deletedTask.name
      );
      setTasks(newTasks);
    }
  }, [route.params?.deletedTask]);

  useEffect(() => {
    if (route.params?.editedTask) {
      console.log(route.params.editedTask);
      const newTasks = tasks.map((task) => {
        if (task.name === route.params.editedTask.name) {
          task.description = route.params.editedTask.description;
        }
        return task;
      });
      setTasks(newTasks);
    }
  }, [route.params?.editedTask]);

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const currentDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>{formattedDate}</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Task
              name={item.name}
              description={item.description}
              goToDetailsScreen={() =>
                navigation.navigate("TaskDetails", { task: item })
              }
            />
          )}
          style={styles.taskList}
        />
      ) : (
        <Text>No hay tareas aún</Text>
      )}
      <Pressable
        style={styles.newTaskBtn}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Text style={styles.newTaskBtnText}>Añade una nueva tarea</Text>
      </Pressable>
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
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 30,
  },
  subtitle: {
    fontSize: "Inter-Regular",
    fontSize: 22,
    marginBottom: 10,
  },
  newTaskBtn: {
    marginTop: "auto",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  newTaskBtnText: {
    fontSize: 18,
  },
});

export default HomeScreen;
