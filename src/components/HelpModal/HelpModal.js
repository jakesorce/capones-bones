import React from "react";
import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default HelpModal = ({ setHelpModalVisible, helpModalVisible }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={helpModalVisible}>
      <View style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          <Text style={styles.modalText}>Welcome to Capone's Bones!</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "white" }}>Game Setup:</Text>
          </View>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "black" }}
            onPress={() => {
              setHelpModalVisible(false);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    flex: 1,
    margin: 20,
    backgroundColor: "rgb(55,54,53)",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 10,
    backgroundColor: "#F194FF",
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontWeight: "bold",
  },
});
