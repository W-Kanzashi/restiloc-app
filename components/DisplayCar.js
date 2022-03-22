import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    margin: "auto",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});

export function DisplayCar(props) {
  console.log("response");
  console.log(props.response);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Immatriculation: {props.response.immatriculation}
        </Text>
        <Text style={styles.text}>Date MEC: {props.response.date_mec}</Text>
        <Text style={styles.text}>Modèle: {props.response.nom_modele}</Text>
        <Text style={styles.text}>Couleur: {props.response.couleur}</Text>
        <Text style={styles.text}>
          Ref Dossier: {props.response.ref_dossier}
        </Text>
      </View>
    </>
  );
}
