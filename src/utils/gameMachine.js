import { Machine, assign } from "xstate";
import _ from "lodash/fp";

import Dice from "./dice";
import Die from "./die";

const MAX_NUMBER_PICKS = 2;
const INITIAL_ROUND_SCORE = 0;
const MAX_KEPT_DICE = 5;

const canChooseMoreDice = (context) => {
  return _.lt(context.numberOfDicePicked, MAX_NUMBER_PICKS);
};

const calculateRoundScore = (context) => {
  return _.reduce(
    (acc, die) => {
      if (die.selected && !die.locked) {
        die.locked = true;
        context.keptDice.push(die);
        return die.face.value === 3 ? acc : acc + die.face.value;
      } else return acc;
    },
    INITIAL_ROUND_SCORE,
    context.dice
  );
};

const canRollDice = (context) => {
  return context.keptDice.length < MAX_KEPT_DICE;
};

export default createGameMachine = () => {
  return Machine(
    {
      id: "game",
      initial: "newGame",
      context: {
        isStarted: false,
        isEnded: false,
        numberOfDicePicked: 0,
        dice: null,
        totalScore: null,
        keptDice: [],
      },
      states: {
        newGame: {
          on: {
            START: "startGame",
          },
        },
        startGame: {
          always: [{ target: "chooseDice" }],
          entry: assign((context) => {
            context.isStarted = true;
            context.dice = new Dice().collection;
            context.keptDice = [];
          }),
        },
        chooseDice: {
          on: {
            DIE_PICKED: "diePicked",
            SCORE_ROUND: "scoreRound",
          },
        },
        rollDice: {
          on: {
            DICE_ROLLED: "diceRolled",
          },
        },
        diceRolled: {
          always: [{ target: "chooseDice" }],
          entry: assign((context) => {
            _.flow(
              _.filter((die) => {
                if (!die.locked && !die.selected) return die;
              }),
              _.map((die) => {
                die.face = Die.newFace();
                return die;
              })
            )(context.dice);
          }),
        },
        resetRound: {
          always: [
            { target: "rollDice", cond: canRollDice },
            { target: "gameEnded", cond: !canRollDice },
          ],
          entry: assign((context) => {
            context.numberOfDicePicked = 0;
            context.dice = _.filter((die) => {
              if (!die.locked) return die;
            }, context.dice);
          }),
        },
        gameEnded: {
          entry: assign((context) => {
            context.isEnded = true;
          }),
        },
        scoreRound: {
          always: [{ target: "resetRound" }],
          entry: assign((context) => {
            context.totalScore += calculateRoundScore(context);
          }),
        },
        diePicked: {
          on: { SCORE_ROUND: "scoreRound" },
          always: [{ target: "chooseDice" }],
          entry: assign((context, event) => {
            context.dice = _.map((die) => {
              if (die.id == event.dieId && !die.locked) {
                if (die.selected) {
                  die.selected = false;
                  context.numberOfDicePicked = context.numberOfDicePicked - 1;
                } else if (!die.selected && canChooseMoreDice(context)) {
                  die.selected = true;
                  context.numberOfDicePicked = context.numberOfDicePicked + 1;
                }
              }
              return die;
            }, context.dice);
          }),
        },
      },
    },
    {
      guards: {
        canRollDice,
      },
    }
  );
};
