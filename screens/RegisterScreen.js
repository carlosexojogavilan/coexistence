import { View, Text, Pressable, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Page</Text>
      <RegisterForm />
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Do you already have an account? Log in</Text>
      </Pressable>
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
  link: {
    fontSize: 16,
    color: "blue",
  },
});

export default RegisterScreen;
