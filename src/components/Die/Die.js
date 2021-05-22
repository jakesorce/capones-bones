import React from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./dieStyles";

export default Die = ({ die, selectDie }) => {
  const diePressed = () => {
    if (die.locked) return Alert.alert("You have already scored that die.");

    selectDie(die.id);
  };

  const dieBorderStyle = () => {
    if (die.locked) return null;

    const color = die.face.value === 3 ? "green" : "red";
    return [styles.selected, { borderColor: color }];
  };

  const setFaceIcon = () => {
    switch (die.face.label) {
      case "one":
        return faDiceOne;
      case "two":
        return faDiceTwo;
      case "three":
        return faDiceThree;
      case "four":
        return faDiceFour;
      case "five":
        return faDiceFive;
      case "six":
        return faDiceSix;
    }
  };

  return (
    <TouchableOpacity
      onPress={diePressed}
      style={die.selected ? dieBorderStyle() : null}
    >
      <FontAwesomeIcon icon={setFaceIcon()} size={60} color="white" />
    </TouchableOpacity>
  );
};
