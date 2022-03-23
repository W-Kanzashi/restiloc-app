import { StyleSheet, Text, View } from "react-native";

import styles from "../styles/styles";

export function DisplayCar({ response }) {
  return (
    <>
      <View>
        <View style={{ margin: 5 }}>
          <Text style={styles.title}>Informations de la voiture</Text>
        </View>
        <Text style={styles.text}>Ref Dossier: {response.ref_dossier}</Text>
        <Text style={styles.text}>
          Immatriculation: {response.immatriculation}
        </Text>
        <Text style={styles.text}>Date MEC: {response.date_mec}</Text>
        <Text style={styles.text}>Modèle: {response.nom_modele}</Text>
        <Text style={styles.text}>Couleur: {response.couleur}</Text>
      </View>
    </>
  );
}
