import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Welcome from "./screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import authHttp from "./services/authService";
import logout from "./assets/logout.png";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Classes from "./screens/Classes";
import Classe from "./screens/Classe";
import Student from "./screens/Student";
import CourtSelect from "./screens/CourseSelect";
import * as ClasseService from "./services/profService";
import Absence from "./screens/Absence";
import Test from "./screens/Test";
import Modules from "./screens/Modules";

export const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null };
  }

  async componentDidMount() {
    const user = await authHttp.auth.getCurrentUser();
    console.log("CDM", user);
    if (user) {
      const classes = await ClasseService.getClasses();
      const lessons = await ClasseService.getLessons();
      this.setState({ classes, lessons });
    }
    this.setState({ user });

    console.log("user", user);
  }

  onLogin = async () => {
    const user = await authHttp.auth.getCurrentUser();

    const classes = await ClasseService.getClasses();
    const lessons = await ClasseService.getLessons();
    console.log("onLogin", user);
    this.setState({ user, classes, lessons });
  };

  // render() {
  //   return <Test />;
  // }

  render() {
    console.log(this.state.user);
    return !this.state.user ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen name="Login">
            {(props) => {
              return <Login {...props} login={this.onLogin} />;
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    authHttp.auth.logout();
                    this.onLogin();
                  }}
                >
                  <Image style={styles.logoutImg} source={logout} />
                </TouchableOpacity>
              );
            },
          }}
        >
          <Stack.Screen name="Home">
            {(props) => {
              return <Home {...props} />;
            }}
          </Stack.Screen>
          <Stack.Screen
            name="New Course session"
            initialParams={{
              user: this.state.user,
              classes: this.state.classes,
              lessons: this.state.lessons,
            }}
            component={CourtSelect}
          />
          <Stack.Screen
            name="Classes"
            initialParams={{
              user: this.state.user,
              classes: this.state.classes,
            }}
            component={Classes}
          />
          <Stack.Screen
            name="Modules"
            initialParams={{
              user: this.state.user,
              lessons: this.state.lessons,
            }}
            component={Modules}
          />
          <Stack.Screen
            name="Classe"
            initialParams={{ user: this.state.user }}
            component={Classe}
          />
          <Stack.Screen
            name="Absence"
            initialParams={{ user: this.state.user }}
            component={Absence}
          />

          <Stack.Screen name="Student" component={Student} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  logoutImg: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
});

export default App;
