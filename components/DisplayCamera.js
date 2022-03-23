import { useState, useEffect } from "react";

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// Open the smartphone camera
import { Camera } from "expo-camera";

const styles = StyleSheet.create({
  container: {
    height: "50%",
  },
});

export default function DisplayCamera() {
  // Camera
  const [hasPermission, setHasPermission] = useState(null);

  let camera;
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  console.log(hasPermission);

  return (
    <View style={styles.container}>
      <Camera
        ref={(r) => {
          camera = r;
        }}
      ></Camera>
    </View>
  );
}
