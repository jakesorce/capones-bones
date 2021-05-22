import _ from "lodash/fp";

import Die from "./die";

const GAME_DICE_COUNT = 5;

export default class Dice {
  constructor() {
    this.collection = _.flow(
      _.range(GAME_DICE_COUNT),
      _.map(() => new Die())
    )(0);
  }
}
