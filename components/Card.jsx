import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Card = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{ ...props.style, ...styles.cardContainer }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: "80%",
    alignItems: "center",
    paddingVertical: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    borderRadius: 20,
    elevation: 6
  }
});
