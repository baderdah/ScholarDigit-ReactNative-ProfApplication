import React from "react";
import { View, StyleSheet, Text, Button, Image, Linking } from "react-native";
import { colors } from "../commons/Colors";
import hero from "../assets/hero.png";
const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>The future of scolarity services </Text>
      <Text style={styles.welcome}>
        SCHOLAR{" "}
        <Text style={{ ...styles.welcome, color: "#feb7b7" }}>DIGIT</Text>
      </Text>
      <Image style={styles.img} source={hero} />
      <View style={styles.btns}>
        <View style={styles.btn}>
          <Button
            color="#64818f"
            title="Get started"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.btn}>
          <Button
            color="#feb7b7"
            title="View on Github"
            onPress={() => Linking.openURL("http://github.com/baderdah")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 30,
    color: "#64818f",
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    marginVertical: 20,
    height: "25%",
    width: "70%",
  },
  btns: {
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    width: 150,
    margin: 10,
    marginVertical: 40,
  },
});

export default Welcome;
