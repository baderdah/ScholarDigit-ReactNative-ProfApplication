import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { colors } from "../commons/Colors";
import Joi from "react-native-joi";
class CourtSelect extends React.Component {
  constructor(props) {
    super(props);
    const theclasses = [];
    const theLessons = [];
    this.props.route.params.classes.map(c => {
      theclasses.push({
        label: c.nom,
        value: c.id
      });
    });
    this.props.route.params.lessons.map(l => {
      theLessons.push({
        label: l.nom,
        value: l.id
      });
    });
    console.log(theclasses);
    this.state = {
      theclasses,
      theLessons,
      selectedClasse: "",
      selectedLesson: "",
      selectedDuration: ""
    };
  }

  schema = {
    classe: Joi.number()
      //   .email()
      .required(),
    lesson: Joi.number().required(),
    duration: Joi.number().required()
  };

  validateForm = () => {
    const result = Joi.validate(
      {
        classe: this.state.selectedClasse,
        lesson: this.state.selectedLesson,
        duration: this.state.selectedDuration
      },
      this.schema,
      {
        abortEarly: false
      }
    );
    if (!result.error) return null;
    const errors = {};
    result.error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  onChangeLessonHandler = value => {
    this.setState({
      selectedLesson: value
    });
  };
  onChangeClasseHandler = value => {
    this.setState({
      selectedClasse: value
    });
  };
  onChangeDurationHandler = value => {
    this.setState({
      selectedDuration: value
    });
  };

  handelConfirm = () => {
    const params = {
      classe: this.props.route.params.classes.filter(
        c => c.id === this.state.selectedClasse
      )[0],
      lesson: this.props.route.params.lessons.filter(
        l => l.id === this.state.selectedLesson
      )[0],
      duration: this.state.selectedDuration
    };
    console.log("params", params);
    this.props.navigation.navigate("Absence", params);
  };

  render() {
    const courtDuration = [
      {
        label: "1 hour",
        value: 1
      },
      {
        label: "2 hours",
        value: 2
      },
      {
        label: "3 hours",
        value: 3
      },
      {
        label: "4 hours",
        value: 4
      }
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create new Course Session</Text>

        <View style={styles.input}>
          <Dropdown
            baseColor={colors.blackx}
            style={styles.input}
            label="Select the classe"
            data={this.state.theclasses}
            onChangeText={value => this.onChangeClasseHandler(value)}
          />
        </View>

        <View style={styles.input}>
          <Dropdown
            style={styles.input}
            baseColor={colors.blackx}
            label="Select the lesson"
            data={this.state.theLessons}
            onChangeText={value => this.onChangeLessonHandler(value)}
          />
        </View>

        <View style={styles.input}>
          <Dropdown
            style={styles.input}
            baseColor={colors.blackx}
            label="
            course session duration"
            data={courtDuration}
            onChangeText={value => this.onChangeDurationHandler(value)}
          />
        </View>

        <Button
          title="confirm"
          onPress={this.handelConfirm}
          disabled={this.validateForm() ? true : false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 2,
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: "10%",
    marginVertical: 40,
    width: "80%",
    paddingVertical: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    borderRadius: 20,
    elevation: 6
  },
  input: {
    marginHorizontal: "10%",
    padding: 5
  },
  title: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.theBlue
  }
});

export default CourtSelect;
