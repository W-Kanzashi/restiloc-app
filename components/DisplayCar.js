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

export function DisplayCar(response) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          Immatriculation: {response.immatriculation}
        </Text>
        <Text style={styles.text}>Date MEC: {response.date_mec}</Text>
        <Text style={styles.text}>Modèle: {response.nom_modele}</Text>
        <Text style={styles.text}>Couleur: {response.couleur}</Text>
        <Text style={styles.text}>Ref Dossier: {response.ref_dossier}</Text>
      </View>
    </>
  );
}
