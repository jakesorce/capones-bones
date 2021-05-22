import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomContent: {
    borderBottomColor: "rgb(55,54,53)",
    borderBottomWidth: 1,
  },
  boneYardContainer: {
    width: "100%",
    borderRadius: 10,
  },
  boneYardText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontWeight: "bold",
  },
  keptDiceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  infoPanel: {
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  diceTray: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    height: 80,
    backgroundColor: "black",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  rollDiceButtonContainer: {
    backgroundColor: "black",
    marginTop: 5,
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
  },
  quote: {
    fontSize: 40,
    padding: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  mainContainer: { flex: 1 },
});
