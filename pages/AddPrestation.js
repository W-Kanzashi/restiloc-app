import { useState, useEffect, Suspense } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import styles from "../styles/styles";
import { Camera } from "expo-camera";

export default function AddWork({ navigation, route }) {
  const [displayCamera, setDisplayCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [pieces, setPieces] = useState(Object.values(route.params.pieces));

  // Data to send to the server
  let defaultValue = {
    client_id: route.params.response.id_client,
    folder_id: route.params.response.id_dossier,
    id_vehicule: route.params.response.id_vehicule,
    id_piece: 0,
    categorie_prestation: "carosserie",
    type_prestation: "",
    libelle_prestation: "Porte",
    description_prestation: "La porte doit être remplacée",
    quantite: 1,
    traitement: "legere",
    photo: {},
  };
  const [prestation, setPrestation] = useState(defaultValue);

  // Use the camera
  let camera = Camera;
  const type = Camera.Constants.Type.back;

  // Display the camera or not
  const handleDisplayCamera = () => setDisplayCamera(!displayCamera);

  // Get the form data
  const handleInputChange = (data, inputName) => {
    console.log("HandleInputChange");
    console.log(data, inputName);
    setPrestation({
      ...prestation,
      [inputName]: data,
    });
  };

  // Use react to get the permissions to use the camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Check the permissions to use the camera
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la camera</Text>;
  }

  // Send data to database
  const handleSubmit = () => {
    const url = "http://10.255.255.3:8090/addPresta.php";
    // Edit the server ip
    // const url = "http://172.24.37.55:8090/getCars.php";
    const Data = prestation;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(Data),
    })
      .then((response) => response.json()) // check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all the pieces from the database
  const handleGetPiece = (itemValue) => {
    const url = "http://10.255.255.3:8090/getPieces.php";
    // Edit the server ip
    // const url = "http://172.24.37.55:8090/getCars.php";
    console.log(itemValue);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        categorie_prestation: itemValue,
      }),
    })
      .then((response) => response.json()) // check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
      .then((response) => setPieces(Object.values(response)))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text style={{ fontSize: 30, color: "black", marginBottom: 20 }}>
              Ajouter une prestation
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, color: "black" }}>
              Type de prestation
            </Text>
            <Picker
              selectedValue={prestation.categorie_prestation}
              onValueChange={(itemValue) => {
                handleInputChange(itemValue, "categorie_prestation");
                handleGetPiece(itemValue);
              }}
            >
              <Picker.Item label="Carosserie" value="carosserie" />
              <Picker.Item label="Piece" value="piece" />
            </Picker>

            {prestation.categorie_prestation === "carosserie" ? (
              <View>
                <Text style={{ fontSize: 20, color: "black" }}>Quantité</Text>
                <Picker
                  selectedValue={prestation.quantite}
                  onValueChange={(itemValue) =>
                    handleInputChange(itemValue, "quantite")
                  }
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                </Picker>
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 20, color: "black" }}>Traitement</Text>
                <Picker
                  selectedValue={prestation.traitement}
                  onValueChange={(itemValue) =>
                    handleInputChange(itemValue.toLowerCase(), "traitement")
                  }
                >
                  <Picker.Item label="legere" value="Légère" />
                  <Picker.Item label="moyenne" value="Moyenne" />
                  <Picker.Item label="forte" value="Forte" />
                </Picker>
              </View>
            )}
            {/* Suspense is use to display a loading page */}
            <Suspense fallback={<Text>Chargement</Text>}>
              <View>
                <Text style={{ fontSize: 20, color: "black" }}>
                  Nom de la Pièce
                </Text>
                <Picker
                  selectedValue={prestation.id_piece}
                  onValueChange={(itemValue) =>
                    handleInputChange(itemValue, "id_piece")
                  }
                >
                  {pieces.map((piece) => (
                    <Picker.Item
                      key={piece.id_piece}
                      label={piece.nom_piece.toString()}
                      value={piece.id_piece.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </Suspense>
          </View>
          <View style={{ flex: 1, height: "100%" }}>
            <TextInput
              label="Prestation a réaliser"
              value={prestation.libelle_prestation}
              style={styles.textInput}
              name="libelle_prestation"
              onChangeText={(data) => {
                handleInputChange(data, "libelle_prestation");
                () => setPieces(data);
              }}
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
              <View style={{ height: 350, flex: 1 }}>
                {/* Use ref to access the camera and dom data */}
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={(r) => {
                    camera = r;
                  }}
                >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={async () => {
                        // Take a picture
                        let photo = await camera.takePictureAsync();
                        // Get the image data
                        handleInputChange(photo, "photo");
                        // Close the camera
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
            source={{ uri: prestation.photo.uri }}
            style={{ width: "100%", height: 350 }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
