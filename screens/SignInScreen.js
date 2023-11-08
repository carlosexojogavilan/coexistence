import { View, Text, StyleSheet, Pressable } from "react-native";
import SignInForm from "../components/SignInForm";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <SignInForm />
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Are you new? Create an account</Text>
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

export default SignInScreen;
