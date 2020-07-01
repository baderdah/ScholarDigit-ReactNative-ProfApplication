import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Switch,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import { colors } from "../commons/Colors";
import * as ClasseService from "../services/profService";
import student from "../assets/student.png";
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  ScaleAnimation,
} from "react-native-popup-dialog";

class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  async componentDidMount() {
    const data = await ClasseService.getStudentsOfTheClasse(
      this.props.route.params.classe.id
    );
    data.map((s) => (s.isAbsent = false));
    // const data = await Service.getClasse();
    this.setState({
      data,
    });
  }
  toggleSwitch = (st) => {
    st = { ...st, isAbsent: !st.isAbsent };
    this.setState({
      data: this.state.data.map((s) => (s.id === st.id ? { ...st } : s)),
    });
  };

  validateAbsence = async () => {
    const absentStudent = [];
    this.state.data.map((s) => {
      if (s.isAbsent) {
        absentStudent.push(s.id);
      }
    });
    const absenceRequap = {
      classeId: this.props.route.params.classe.id,
      lessonId: this.props.route.params.lesson.id,
      duration: this.props.route.params.duration,
      absentStudent,
    };
    await ClasseService.markAbsence(absenceRequap);

    this.setState({ visible: true });

    console.log("absenteStudent", absenceRequap);
  };
  render() {
    console.log(this.state);
    const { classe, lesson, duration } = this.props.route.params;
    return (
      <View style={styles.Container}>
        <Dialog
          style={styles.dialogContainer}
          visible={this.state.visible}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0, // optional
              useNativeDriver: true, // optional
            })
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="OK"
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                  this.props.navigation.navigate("Home");
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent style={styles.dialogContainer}>
            <Text style={styles.dialogContent}>Absence marked</Text>
          </DialogContent>
        </Dialog>
        <Card style={styles.ClasseContainer}>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Classe : </Text> {classe.nom}
          </Text>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Lesson : </Text>
            {lesson.nom}
          </Text>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Duration : </Text>
            {duration}
          </Text>
        </Card>
        <FlatList
          style={styles.cardConatianer}
          data={this.state.data}
          renderItem={(items) => {
            return (
              <View>
                <Card
                  onPress={() => this.toggleSwitch(items.item)}
                  style={{
                    ...styles.card,
                    backgroundColor: items.item.isAbsent ? "#ffb7b7" : "white",
                  }}
                >
                  <Image style={styles.img} source={student} />
                  <Text style={styles.text}>
                    {items.item.nom} {items.item.prenom}
                  </Text>
                  <View style={styles.SwitchContainer}>
                    <Switch
                      trackColor={{ false: "#767577", true: "red" }}
                      thumbColor="#f4f3f4"
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => this.toggleSwitch(items.item)}
                      value={items.item.isAbsent}
                    />
                  </View>
                </Card>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <Button title="Validate" onPress={this.validateAbsence} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardConatianer: {
    paddingVertical: 5,
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary,
  },

  textClasse: {
    width: "90%",
    color: colors.blackx,
  },
  textTitle: {
    color: colors.theXblue,
    fontWeight: "700",
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  ClasseContainer: {
    marginVertical: 5,
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 1,
    width: "100%",
  },
  img: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  card: {
    backgroundColor: colors.primaryx,
    borderColor: colors.white,
    borderWidth: 2,
    alignSelf: "center",
    marginVertical: 5,
    flexDirection: "row",
    padding: 10,
  },
  text: {
    color: colors.blackx,
    flex: 1,
    textAlign: "center",
  },
  SwitchContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContent: {
    color: colors.theXblue,
    width: Dimensions.get("window").width * 0.6,
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 25,
    fontWeight: "bold",
  },
});
export default Absence;
