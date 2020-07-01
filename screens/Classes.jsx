import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Card from "../components/Card";
import { colors } from "../commons/Colors";
import Classe from "./Classe";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.classes
    };
  }

  componentDidMount() {}

  render() {
    return (
      <FlatList
        style={styles.cardConatianer}
        data={this.state.data}
        renderItem={items => {
          return (
            <View>
              <Card
                onPress={() =>
                  this.props.navigation.navigate("Classe", {
                    classe: items.item
                  })
                }
                style={styles.card}
              >
                <Text style={styles.text}>{items.item.nom}</Text>
              </Card>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardConatianer: {
    paddingVertical: 5,
    flex: 1,
    // borderWidth: 2,
    backgroundColor: colors.primary
  },
  card: {
    backgroundColor: colors.primaryx,
    borderColor: colors.primaryA,
    borderWidth: 2,
    alignSelf: "center",
    marginVertical: 5
  },
  text: {
    fontWeight: "800",
    fontSize: 15,
    color: colors.theXblue
  }
});

export default Classes;
