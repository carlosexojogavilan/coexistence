import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import Task from "../components/Task";

import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);

  //Get the tasks

  const getTasks = async () => {
    try {
      const gettedTasks = [];
      const querySnapshot = await getDocs(collection(db, "Tasks"));
      querySnapshot.forEach((doc) => {
        gettedTasks.push({ id: doc.id, ...doc.data() });
      });
      setTasks(gettedTasks);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  //Add the tasks

  const addNewTask = async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        name: newTask.name,
        description: newTask.description,
      });
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

  //Delete the tasks

  const deleteTask = async (deletedTaskID) => {
    try {
      await deleteDoc(doc(db, "Tasks", deletedTaskID));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params?.deletedTask) {
      const newTasks = tasks.filter(
        (task) => task.id !== route.params.deletedTask.id
      );
      setTasks(newTasks);
      deleteTask(route.params.deletedTask.id);
    }
  }, [route.params?.deletedTask]);

  //Edit the tasks

  const editTask = async (editedTask) => {
    try {
      await setDoc(doc(db, "Tasks", editedTask.id), editedTask);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params?.editedTask) {
      console.log(route.params.editedTask);
      const newTasks = tasks.map((task) => {
        if (task.id === route.params.editedTask.id) {
          task = route.params.editedTask;
          editTask(task);
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
