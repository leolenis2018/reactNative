import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import listStudents from "./components/listStudents";
import Users from "./components/users";

//Tipo Clase
//Siempre que hacemos un componente tipo class, debe haber un metodo llamado render. Linea 8

class Home extends React.Component {
  //Definicion de constructor y sus variables de estado
  constructor(props) {
    super(props);

    //Variables de Estado, como son una clase, llevan el this.state
    this.state = {
      Student_ID: "",
      Student_Name: "",
      Student_Class: "",
      Student_Phone_Num: "",
      Student_Email: "",
      // Este data source es un arreglo que se va a llenar con todos los datos
      dataSource: [],
    };
  }
  refreshStudents() {
    fetch(`http://localhost/apireactnativeacademic/showallstudentslist.php`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  //Al cargar todos los componentes de la interfaz
  componentDidMount() {
    this.refreshStudents();
  }

  //Agregar un estudiante
  InsertStudent = () => {
    fetch("http://localhost/apireactnativeacademic/InsertStudentData.php", {
      method: "POST", // Los datos se envían de forma oculta.
      headers: {
        //Formato en el que viaja la información.
        Accept: "Aplication/json",
        "Content-Type": "Aplication/json",
      },
      //Enviamos los datos que vamos a registrar.
      //Lleva el this.state porque hace referencia a una variable de estado.
      body: JSON.stringify({
        student_name: this.state.Student_Name,
        student_class: this.state.Student_Class,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Agregado Correctamente..." + responseJson);
        this.refreshStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Buscar un estudiante por Id
  SearchStudent = () => {
    fetch(`http://localhost/apireactnativeacademic/ShowStudentxId.php`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //Esto es para que la infromacion que escribo en el formulario la convierta a formato json
      body: JSON.stringify({
        student_id: this.state.Student_ID,
      }),
    })
      .then((response) => response.json())
      //Esta es la respuesta del archivo de PHP
      .then((responseJson) => {
        this.setState({
          Student_Name: responseJson[0]["student_name"],
          Student_Class: responseJson[0]["student_class"],
          Student_Phone_Num: responseJson[0]["student_phone_num"],
          Student_Email: responseJson[0]["student_email"],
        });
      })
      .catch((error) => {
        alert("No se encuentra el Id");
        //Limpiar la informacion de los controles
        this.setState({
          Student_ID: "",
          Student_Name: "",
          Student_Class: "",
          Student_Phone_Num: "",
          Student_Email: "",
          dataSource: [],
        });
      });
  };

  // Actualizar poo ID
  UpdateStudent = () => {
    fetch("http://localhost/apireactnativeacademic/UpdateStudentRecord.php", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID,
        student_name: this.state.Student_Name,
        student_class: this.state.Student_Class,
        student_phone_num: this.state.Student_Phone_Num,
        student_email: this.state.Student_Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Estudiante actualizado correctamente ...");
        this.refreshStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Eliminar por id
  DeleteStudent = () => {
    fetch("http://localhost/apireactnativeacademic/DeleteStudentRecord.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: this.state.Student_ID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Estudiante eliminado correctamente ...");
        this.refreshStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ color: "red" }}>
          Bienvenid@:{" "}
          {JSON.stringify(
            this.props.navigation.getParam("Name", "No conectado")
          )}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Registro de Estudiante{" "}
        </Text>
        <TextInput
          placeholder="Ingrese el Id del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_ID: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_ID}
        />
        <TextInput
          placeholder="Ingrese el nombre del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Name: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Name}
          autoFocus={true}
        />
        <TextInput
          placeholder="Ingrese la clase del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Class: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Class}
        />
        <TextInput
          placeholder="Ingrese número de teléfono"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Phone_Num: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Phone_Num}
        />
        <TextInput
          placeholder="Ingrese el correo electrónico"
          onChangeText={(TextInputValue) =>
            this.setState({ Student_Email: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.Student_Email}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.InsertStudent}
        >
          <Text style={styles.TextStyle}> Agregar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.SearchStudent}
        >
          <Text style={styles.TextStyle}> Buscar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudent}
        >
          <Text style={styles.TextStyle}> Actualizar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudent}
        >
          <Text style={styles.TextStyle}> Eliminar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.navigate("Estudiantes")}
        >
          <Text style={styles.TextStyle}> Listar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.navigate("Sesion")}
        >
          <Text style={styles.TextStyle}> Iniciar Sesión </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Inicio: Home,
    Estudiantes: listStudents,
    Sesion: Users,
  },
  {
    //Aquí le puedo decir por dónde debe iniciar
    initialRouteName: "Sesion",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
    marginBottom: 7,
    width: "90%",
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
