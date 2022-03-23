import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

import styles from "../styles/styles";

import DisplayCamera from "../components/DisplayCamera";

let defaultValue = {
  prestation: "",
  description_prestation: "",
  photo: "",
};

export default function AddWork() {
  const [prestation, setPrestation] = useState(defaultValue);
  const [camera, setCamera] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text>Ajouter une prestation</Text>
      </View>
      <View>
        <TextInput
          label="Prestation a réaliser"
          value={prestation.prestation}
          style={styles.textInput}
        />
        <TextInput
          label="Description de la prestation"
          value={prestation.description_prestation}
          style={styles.textInput}
        />
        <Button
          icon="camera"
          mode="contained"
          onPress={() => setCamera(!camera)}
        >
          Prendre une photo
        </Button>
        {camera && <DisplayCamera />}
      </View>
    </>
  );
}
