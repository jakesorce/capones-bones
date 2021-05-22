import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
} from "@fortawesome/free-solid-svg-icons";

export default Lobby = ({ history }) => {
  const navigate = (url) => {
    history.push(url);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "40%",
          borderRadius: 10,
          width: "100%",
          backgroundColor: "rgba(0,0,0, 0.8)",
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          Game Stats
        </Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Games Played: 0
          </Text>

          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Games Won: 0
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Games Lost: 0
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Last Game Score: 0
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.lobbyButton}
        onPress={() => navigate("/new_game")}
      >
        <FontAwesomeIcon icon={faDiceOne} size={30} color="white" />
        <Text style={{ fontSize: 20, color: "white", marginLeft: 10 }}>
          Practice Game
        </Text>
        <FontAwesomeIcon icon={faDiceOne} size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lobbyButton}
        onPress={() => navigate("/online_game")}
      >
        <FontAwesomeIcon icon={faDiceTwo} size={30} color="white" />
        <Text style={{ fontSize: 20, color: "white", marginLeft: 10 }}>
          Online Game
        </Text>
        <FontAwesomeIcon icon={faDiceTwo} size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lobbyButton}
        onPress={() => navigate("/local")}
      >
        <FontAwesomeIcon icon={faDiceThree} size={30} color="white" />
        <Text style={{ fontSize: 20, color: "white", marginLeft: 10 }}>
          Local Game
        </Text>
        <FontAwesomeIcon icon={faDiceThree} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "rgb(55,54,53)",
    borderBottomWidth: 1,
    justifyContent: "space-evenly",
  },
  lobbyButton: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "black",
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
