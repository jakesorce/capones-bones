import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  Button,
} from "react-native";
import _ from "lodash/fp";
import { StatusBar } from "expo-status-bar";
import { NativeRouter, Route } from "react-router-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import caponeBackground from "./src/images/capone-background.jpg";
import Game from "./src/components/Game";
import HelpModal from "./src/components/HelpModal";
import Lobby from "./src/components/Lobby";
import MatchMaker from "./src/components/MatchMaker";
import Settings from "./src/components/Settings";

export default App = () => {
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <HelpModal
          helpModalVisible={helpModalVisible}
          setHelpModalVisible={setHelpModalVisible}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            textShadowColor: "black",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          }}
        >
          Capone's Bones
        </Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faCog} size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Button
        title="How To Play"
        onPress={() => setHelpModalVisible(true)}
      ></Button>

      <ImageBackground source={caponeBackground} style={styles.backgroundImage}>
        <NativeRouter>
          <Route exact path="/" component={Lobby} />
          <Route path="/new_game" component={Game} />
          <Route path="/match_maker" component={MatchMaker} />
          <Route path="/settings" component={Settings} />
        </NativeRouter>
      </ImageBackground>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(55,54,53)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
});
