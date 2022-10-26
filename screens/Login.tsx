import { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppwriteContext } from "../appwrite/Context";
import PageContainer from "../componenets/PageContainer";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { appwrite, setLoggedIn, loggedIn } = useContext(AppwriteContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError("All fields are required");
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then((response: any) => {
          if (response) {
            setLoggedIn(true);
            navigation.navigate("Home");
          }
        })
        .catch((e) => {
          console.log(e);
          setError("Incorrect email or password");
        });
    }
  };

  return (
    <>
      <PageContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              // backgroundColor: "red",
              height: "100%",
            }}
          >
            <Text
              style={{
                color: "#484848",
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Listr.
            </Text>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"#AEAEAE"}
              placeholder="Email"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"#AEAEAE"}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
            {error ? (
              <Text
                style={{ color: "red", alignSelf: "center", marginTop: 10 }}
              >
                {error}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.btn, { marginTop: error ? 10 : 20 }]}
            >
              <Text
                style={{
                  color: "#484848",
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  color: "#484848",
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                New user? <Text style={{ color: "#43BCCD" }}>Signup</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#484848",
    padding: 10,
    height: 40,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    color: "white",
    borderColor: "#484848",
    borderBottomWidth: 1,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btn: {
    backgroundColor: "white",
    padding: 10,
    height: 45,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default LoginScreen;
