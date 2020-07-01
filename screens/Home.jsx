import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import authHttp from "../services/authService";
import Card from "../components/Card";
import { colors } from "../commons/Colors";
import classroom from "../assets/classroom.png";
import absence from "../assets/absence.png";
import lessons from "../assets/lessons.png";
const Home = (props) => {
  const logout = () => {
    props.logout();
  };
  return (
    <View style={style.container}>
      <View style={style.cardContainer}>
        <Card
          style={style.card}
          onPress={() => props.navigation.navigate("Classes")}
        >
          <Image style={style.img} source={classroom} />
          <Text style={style.Home}>Classes</Text>
        </Card>
        <Card
          style={style.card}
          onPress={() => props.navigation.navigate("New Course session")}
        >
          <Image style={style.img} source={absence} />
          <Text style={style.Home}>New Course Session</Text>
        </Card>

        <Card
          style={style.card}
          onPress={() => props.navigation.navigate("Modules")}
        >
          <Image style={style.img} source={lessons} />
          <Text style={style.Home}>My lessons</Text>
        </Card>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  Home: {
    fontSize: 30,
    color: colors.theBlue,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderColor: colors.primaryA,
    backgroundColor: colors.primaryx,
    borderWidth: 2,
    height: "28%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "4%",
    marginVertical: "4%",
  },
  img: {
    height: "77%",
    width: "40%",
  },
});

export default Home;
