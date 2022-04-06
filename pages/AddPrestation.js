import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

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
  const [displayCamera, setDisplayCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  let camera = Camera;
  const type = Camera.Constants.Type.back;

  const handleDisplayCamera = () => setDisplayCamera(!displayCamera);

  const handleInputChange = (data, inputName) => {
    setPrestation({
      ...prestation,
      [inputName]: data,
    });
  };

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleSubmit = () => {
    const url = "http://10.255.255.3:8090/addPresta.php";
    // Edit the server ip
    // const url = "http://172.24.37.55:8090/getCars.php";
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
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("prestation.photo");
  console.log(prestation);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Ajouter une prestation</Text>
          </View>
          <View>
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

            {displayCamera && (
              <View style={{ height: "100%" }}>
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
                        let photo = await camera.takePictureAsync();
                        handleInputChange(photo, "photo");
                        setDisplayCamera(!displayCamera);
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "white" }}>
                        {" "}
                        Photo{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>
            )}

            <Button
              mode="contained"
              style={{ marginBottom: "2%" }}
              onPress={handleDisplayCamera}
            >
              Prendre une photo
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ marginBottom: "2%" }}
            >
              Valider
            </Button>
          </View>
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: "100%", height: "100%" }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
