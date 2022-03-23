import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { DisplayCar } from "../components/DisplayCar";
import { DisplayClient } from "../components/DisplayClient";

import styles from "../styles/styles";

export default function ({ navigation, route }) {
  return (
    <>
      <View style={styles.container}>
        <DisplayCar response={route.params.response} />
        <DisplayClient response={route.params.response} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Prestation")}
          style={{ marginVertical: 5, width: 300, marginHorizontal: "auto" }}
        >
          Ajouter une prestation
        </Button>
      </View>
    </>
  );
}
