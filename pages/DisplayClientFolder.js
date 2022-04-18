import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { DisplayCar } from "../components/DisplayCar";
import { DisplayClient } from "../components/DisplayClient";

import styles from "../styles/styles";

export default function ({ navigation, route }) {
  const getPieces = () => {
    const url = "http://10.255.255.3:8090/getPieces.php";
    // Edit the server ip
    // const url = "http://172.24.37.55:8090/getCars.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let data = { categorie_prestation: "carosserie" };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => {
        navigation.navigate("Prestation", {
          response: route.params.response,
          pieces: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetPiece = () => {
    getPieces();
  };

  return (
    <>
      <View style={styles.container}>
        <DisplayCar response={route.params.response} />
        <DisplayClient response={route.params.response} />
        <Button
          mode="contained"
          onPress={handleGetPiece}
          style={{ marginVertical: 5, width: 300, marginHorizontal: "auto" }}
        >
          Ajouter une prestation
        </Button>
      </View>
    </>
  );
}
