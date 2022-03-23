import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DisplayCar } from "./components/DisplayCar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();

// Home screen
function HomeScreen() {
  const [immatriculation, setImmatriculation] = useState("");
  const [response, setResponse] = useState(null);

  const getData = () => {
    // const url = "http://10.255.255.3:8090/getCars.php";
    // Edit the server ip
    const url = "http://172.24.151.238:8090/getCars.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var Data = {
      Immatriculation: immatriculation,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json()) // check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => {
        // alert(response); // If data is in JSON => Display alert msg
        setResponse(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: "#000", fontSize: 20 }}>
          Saisir une plaque d'immatriculation
        </Text>
        <TextInput
          placeholder="Immatriculation"
          style={{
            width: 250,
            margin: 10,
            padding: 4,
            textAlign: "center",
            borderColor: "#333",
            borderWidth: 1,
          }}
          underlineColorAndroid="transparent"
          onChangeText={(immatriculation) =>
            setImmatriculation(immatriculation)
          }
        />

        <TouchableOpacity
          style={{
            width: 250,
            padding: 10,
            backgroundColor: "black",
            alignItems: "center",
          }}
          onPress={getData}
        >
          <Text style={{ color: "#fff" }}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      {response === null ? (
        <Text>"Voiture non trouvé"</Text>
      ) : (
        <DisplayCar response={response} />
      )}
    </>
  );
}

// App entry point
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
