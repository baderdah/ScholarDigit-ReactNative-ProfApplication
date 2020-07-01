import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import authHttp from "../services/authService";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "click the button"
    };
  }

  handelBtnClicked = async () => {
    const response = await authHttp.http
      .post("exp://192.168.1.4:8080/authenticate", {
        userName: "scholarity",
        password: "password"
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    console.log("GET_Modules : ", response);

    https: this.setState({
      text: "done"
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title="test the service" onPress={this.handelBtnClicked} />
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default Test;
