import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="CreateTask" component={CreateTaskScreen} />
      <HomeStack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
