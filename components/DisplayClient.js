import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import styles from "../styles/styles";

export function DisplayClient({ response }) {
  return (
    <>
      <View>
        <View style={{ margin: 5 }}>
          <Text style={styles.title}>Informations client :</Text>
        </View>
        <Text style={styles.text}>Nom: {response.nom_client}</Text>
        <Text style={styles.text}>Prénom: {response.prenom_client}</Text>
      </View>
    </>
  );
}
