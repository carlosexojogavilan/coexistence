import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Pressable
        style={styles.logOutBtn}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={styles.logOutBtnText}>Log Out</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter-Bold",
    fontSize: 30,
  },
  logOutBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  logOutBtnText: {
    fontSize: 20,
  },
});

export default ProfileScreen;
