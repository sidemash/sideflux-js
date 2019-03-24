import {Action} from "../../src/ts/Action";
import {OnlyReadable} from "utilitaire";

const ActionType = {
    increment : "increment",
    addValue  : "addValue",
    decrement : "decrement"
};

export const CounterAction = Action.from(ActionType, {
    increment: () => new Action(ActionType.increment),
    addValue: (value: number) => new Action(ActionType.addValue, value),
    decrement: () => new Action(ActionType.decrement)
});


