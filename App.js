import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { DisplayCar } from "./components/DisplayCar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default function App() {
  const [Immatriculation, setImmatriculation] = useState("");
  const [response, setResponse] = useState({});

  const getData = () => {
    var url = "http://10.255.255.3:8090/getCars.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var Data = {
      Immatriculation: Immatriculation,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ Data }),
    })
      .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => {
        // alert(response); // If data is in JSON => Display alert msg
        setResponse(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(response);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Immatriculation"
          style={{
            width: 250,
            margin: 10,
            borderColor: "#333",
            borderWidth: 1,
          }}
          underlineColorAndroid="transparent"
          onChangeText={(Immatriculation) =>
            setImmatriculation(Immatriculation)
          }
        />

        <TouchableOpacity
          style={{
            width: 250,
            padding: 10,
            backgroundColor: "magenta",
            alignItems: "center",
          }}
          onPress={getData}
        >
          <Text style={{ color: "#fff" }}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      {response !== null ? <DisplayCar response={response} /> : ""}
    </>
  );
}
