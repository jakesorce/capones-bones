import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import DIE_FACES from "./dieFaces";

export default class Die {
  static newFace() {
    return DIE_FACES[Math.floor(Math.random() * DIE_FACES.length)];
  }

  constructor() {
    this.id = uuidv4();
    this.face = Die.newFace();
    this.selected = false;
    this.locked = false;
  }
}
