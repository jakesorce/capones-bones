import React, { useState, useEffect, useRef } from "react";
import { Button, View, Text, Alert, Animated } from "react-native";
import _ from "lodash/fp";
import { useMachine } from "@xstate/react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, faQuestion } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-native-confetti";

import Die from "../Die";
import HelpModal from "../HelpModal";
import createGameMachine from "../../utils/gameMachine";
import quotes from "../../utils/quotes";

import styles from "./gameStyles";

export default Game = ({ history }) => {
  const gameMachine = createGameMachine();
  // TODO: use local storage to set modal open if first time playing
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [game, updateGame] = useMachine(gameMachine);
  const [quote, setQuote] = useState(null);
  const confettiRef = useRef(null);
  const [diceTrayFadeValue, setDiceTrayFadeValue] = useState(
    new Animated.Value(0)
  );

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const selectDie = (dieId) => {
    updateGame("DIE_PICKED", { dieId });
  };

  const rollButtonTitle = () => {
    if (game.matches("gameEnded")) return "Back To Lobby";
    if (!game.context.isStarted) return "Start Game";
    if (game.matches("rollDice")) return "Roll";
    if (game.context.numberOfDicePicked === 0) return "Choose Dice To Score";
    if (game.context.numberOfDicePicked > 0) return "Score Round";
  };

  const mainButtonPressed = () => {
    if (game.matches("gameEnded")) {
      confettiRef.current.stopConfetti();
      return history.push("/");
    }
    if (game.matches("rollDice")) return updateGame("DICE_ROLLED");
    if (game.context.numberOfDicePicked > 0) return updateGame("SCORE_ROUND");
    if (game.matches("newGame")) {
      Animated.timing(diceTrayFadeValue, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
      }).start();
      return updateGame("START");
    }
  };

  const quitGame = () => {
    Alert.alert(
      "Quit Game?",
      "Are you sure you want to quit? Your progress will be lost!",
      [
        {
          text: "Yes",
          onPress: () => history.push("/"),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  if (game.matches("gameEnded")) confettiRef.current.startConfetti();

  return (
    <View style={styles.mainContainer}>
      <View style={{ zIndex: 100 }}>
        <Confetti
          untilStopped={true}
          colors={["rgb(255,255,255)", "rgb(0,0,0)", "rgb(207,181,59)"]}
          ref={confettiRef}
        />
      </View>
      <HelpModal
        helpModalVisible={helpModalVisible}
        setHelpModalVisible={setHelpModalVisible}
      />
      <View style={styles.infoPanel}>
        <Text style={styles.quote}>{quote}</Text>
        {!_.isEmpty(game.context.keptDice) && (
          <View style={styles.boneYardContainer}>
            <Text style={styles.boneYardText}>
              Bone Yard: {game.context.totalScore && game.context.totalScore}
            </Text>
            <View style={styles.keptDiceContainer}>
              {game.context.keptDice.map((die) => (
                <Die key={die.id} die={die} selectDie={_.noop} />
              ))}
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomContent}>
        {!game.context.isEnded && game.context.dice && (
          <Animated.View
            style={[styles.diceTray, { opacity: diceTrayFadeValue }]}
          >
            {game.context.isStarted &&
              game.context.dice.map((die) => (
                <Die key={die.id} die={die} selectDie={selectDie} />
              ))}
          </Animated.View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={quitGame}>
            <FontAwesomeIcon icon={faTimes} size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.rollDiceButtonContainer}>
            <Button
              onPress={mainButtonPressed}
              title={rollButtonTitle()}
              color="white"
            />
          </View>
          <TouchableOpacity onPress={() => setHelpModalVisible(true)}>
            <FontAwesomeIcon icon={faQuestion} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
