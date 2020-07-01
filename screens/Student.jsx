import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import { colors } from "../commons/Colors";
import * as profService from "../services/profService";
import { BaseRouter } from "@react-navigation/core";
import profile from "../assets/profile.png";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.student = this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    // const defaultsource = await profService.getProfilePic(
    //   this.props.route.params.student.profilePicture
    // );
    const absences = await profService.getStudentAbsence(
      this.props.route.params.student.id
    );
    this.setState({
      // src: defaultsource,
      absences,
    });
  }

  render() {
    const student = this.props.route.params.student;
    console.log("[STUDENT] : ", student);
    const windowWidth = Dimensions.get("window").width;
    return (
      <View style={styles.Container}>
        <Card style={styles.StudentContainer}>
          <Image
            source={profile}
            style={{
              borderWidth: 2,
              width: windowWidth / 4,
              height: windowWidth / 4,
              borderRadius: windowWidth,
            }}
          />
          <View
            style={{
              marginTop: 10,
              width: "85%",
              borderBottomColor: "#bcdeff",
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.studentInformation}>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Nom : </Text>
              <Text> {student.nom}</Text>
            </View>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Prenom : </Text>
              <Text> {student.prenom}</Text>
            </View>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Email : </Text>
              <Text> {student.email}</Text>
            </View>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Tel : </Text>
              <Text> {student.tel}</Text>
            </View>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Filiere : </Text>
              <Text>{student.classe.filiere.nom}</Text>
            </View>
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Classe : </Text>
              <Text style={styles.textInfo}>{student.classe.nom} </Text>
            </View>

            <View
              style={{
                marginTop: 10,
                width: "85%",
                borderBottomColor: "#bcdeff",
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.textClasse}>
              <Text style={styles.textTitle}>Absence </Text>
            </View>

            {this.state.absences &&
              this.state.absences.map((a) => (
                <View key={a.id} style={styles.textClasse}>
                  <Text style={styles.textTitle}>{a.module.nom} : </Text>
                  <Text style={styles.textInfo}>{a.numberOfAbsence} </Text>
                </View>
              ))}
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 5,
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary,
  },
  StudentContainer: {
    flex: 1,
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 2,
    alignSelf: "center",
    marginVertical: 5,
  },
  studentInformation: {
    marginTop: 10,
    // borderWidth: 2,
    width: "90%",
  },
  textClasse: {
    width: "90%",
    color: colors.blackx,
    marginVertical: 4,
    flexDirection: "row",
  },

  textTitle: {
    marginLeft: 20,
    width: 100,
    color: colors.theXblue,
    fontWeight: "700",
  },
  textInfo: {},
});

export default Student;
