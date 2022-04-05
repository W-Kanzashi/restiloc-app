import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import styles from "../styles/styles";
import { Camera } from "expo-camera";

let defaultValue = {
  prestation: "",
  description_prestation: "",
  type: "carosserie",
  photo: {},
};

export default function AddWork() {
  const [prestation, setPrestation] = useState(defaultValue);
  let camera = Camera;
  const type = Camera.Constants.Type.back;

  const handleInputChange = (data, inputName) => {
    setPrestation({
      ...prestation,
      [inputName]: data,
    });
  };

  const handleSubmit = () => {
    // const url = "http://10.255.255.3:8090/getCars.php";
    // Edit the server ip
    const url = "http://172.24.37.55:8090/getCars.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var Data = prestation;
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
      <View style={styles.container}>
        <Text>Ajouter une prestation</Text>
      </View>
      <View>
        <Picker
          selectedValue={prestation.type}
          onValueChange={(itemValue) => handleInputChange(itemValue, "type")}
        >
          <Picker.Item label="Carosserie" value="carosserie" />
          <Picker.Item label="Piece" value="piece" />
        </Picker>
        <TextInput
          label="Prestation a réaliser"
          value={prestation.prestation}
          style={styles.textInput}
          name="prestation"
          onChangeText={(data) => handleInputChange(data, "prestation")}
        />
        <TextInput
          label="Description de la prestation"
          value={prestation.description_prestation}
          style={styles.textInput}
          name="description_prestation"
          onChangeText={(data) =>
            handleInputChange(data, "description_prestation")
          }
        />

        <View style={{ height: "50%", width: "100%" }}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(r) => {
              camera = r;
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const photo = await camera.takePictureAsync();
                  console.log(photo);
                  handleInputChange(photo.uri, "photo");
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}> Photo </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>

        <Button mode="contained" onPress={handleSubmit}>
          Prendre une photo
        </Button>
      </View>
    </>
  );
}
