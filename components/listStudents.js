import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";


export default class listStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  //Metodos
  refreshStudents() {
    fetch(`http://localhost/apireactnativeacademic/showallstudentslist.php`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  //Invoca a refresh
  componentDidMount() {
    this.refreshStudents();
  }

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => 
          <TouchableOpacity
            onPress={() =>
              alert(item.student_class + " -- " + item.student_email)
            }
            style={styles.TouchableOpacityStyle}
          >
            <Text>
              {item.student_name} - {item.student_phone_num}
            </Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 5,
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    width: "100%",
    backgroundColor: "#00BCD4",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
