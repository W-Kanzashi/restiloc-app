import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button, Snackbar, TextInput } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [immatriculation, setImmatriculation] = useState("");

  const onDismissSnackBar = () => setVisible(false);
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
        response === null
          ? setVisible(true)
          : navigation.navigate("Dossier Client", { response: response });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Annuler",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        La plaque d'immatriculation n'existe pas.
      </Snackbar>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#000", fontSize: 20, padding: 10, margin: 10 }}>
          Saisir une plaque d'immatriculation
        </Text>
        <TextInput
          style={{ padding: 10, margin: 10, height: 30 }}
          placeholder="Immatriculation"
          underlineColorAndroid="transparent"
          value={immatriculation}
          onChangeText={(immatriculation) =>
            setImmatriculation(immatriculation)
          }
        />

        <TouchableOpacity onPress={getData} style={{ padding: 10, margin: 10 }}>
          <Button icon="folder-search-outline" mode="contained">
            Rechercher
          </Button>
        </TouchableOpacity>
      </View>
    </>
  );
}
