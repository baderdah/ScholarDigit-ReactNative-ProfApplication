import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Card from "../components/Card";
import { colors } from "../commons/Colors";
import * as ClasseService from "../services/profService";
import student from "../assets/student.png";

class Classe extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const data = await ClasseService.getStudentsOfTheClasse(
      this.props.route.params.classe.id
    );
    // const data = await Service.getClasse();
    console.log(data);
    this.setState({
      data
    });
  }

  render() {
    return (
      <View style={styles.Container}>
        <Card style={styles.ClasseContainer}>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Classe : </Text>{" "}
            {this.props.route.params.classe.nom}
          </Text>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Filiere : </Text>{" "}
            {this.props.route.params.classe.filiere.nom}
          </Text>
          <Text style={styles.textClasse}>
            <Text style={styles.textTitle}>Department : </Text>
            {this.props.route.params.classe.filiere.departement.nom}
          </Text>
        </Card>
        <FlatList
          style={styles.cardConatianer}
          data={this.state.data}
          renderItem={items => {
            return (
              <View>
                <Card
                  onPress={() =>
                    this.props.navigation.navigate("Student", {
                      student: items.item
                    })
                  }
                  style={styles.card}
                >
                  <Image style={styles.img} source={student} />
                  <Text style={styles.text}>
                    {items.item.nom} {items.item.prenom}
                  </Text>
                </Card>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
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
    backgroundColor: colors.primary
  },
  card: {
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 2,
    alignSelf: "center",
    marginVertical: 5,
    flexDirection: "row",
    padding: 10
  },
  text: {
    color: colors.blackx,
    flex: 1,
    textAlign: "center",
    marginRight: 40
  },
  textClasse: {
    width: "90%",
    color: colors.blackx
  },
  textTitle: {
    color: colors.theXblue,
    fontWeight: "700"
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary
  },
  ClasseContainer: {
    marginVertical: 5,
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 1,
    width: "100%"
  },
  img: {
    marginLeft: 10,
    height: 30,
    width: 30
  }
});

export default Classe;
