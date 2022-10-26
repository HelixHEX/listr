import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppwriteProvider, AppwriteContext } from "./appwrite/Context";
//screens
import Home from "./screens/Home";
import Tasks from "./screens/Tasks";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Loading from "./screens/Loading";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { appwrite, loggedIn, setLoggedIn } = useContext(AppwriteContext);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    //check if user is logged in using getCurrentUser method
    appwrite
      .getCurrentUser()
      .then((response) => {

        setLoading(false);
        if (response) {
          setLoggedIn(true);
        }
      })
      .catch((e) => {

        console.log(e);
        setLoading(false);
        setLoggedIn(false);
      });
  }, []);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F2F2F2",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : loggedIn ? (
          <>
            <Stack.Screen
              options={{ animation: "fade", gestureEnabled: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ animation: "slide_from_left" }}
              name="Tasks"
              component={Tasks}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ animation: "fade", gestureEnabled: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ animation: "fade", gestureEnabled: false }}
              name="Signup"
              component={Signup}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <>
      <AppwriteProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </AppwriteProvider>
    </>
  );
};

export default App;
