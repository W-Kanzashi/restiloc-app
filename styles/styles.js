import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    height: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#64748b",
  },
  text: {
    fontSize: 20,
    color: "black",
    marginLeft: 5,
  },
  textInput: {
    marginVertical: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
});

export default styles;
