import { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default function App() {
  const getData = () => {
    fetch("http://10.255.255.3:3000/cars", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((users) => console.warn(users));
  };

  return (
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
  );
}
