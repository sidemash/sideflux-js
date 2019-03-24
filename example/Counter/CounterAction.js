"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../../src/ts/Action");
var ActionType = {
    increment: "increment",
    addValue: "addValue",
    decrement: "decrement"
};
exports.CounterAction = Action_1.Action.from(ActionType, {
    increment: function () { return new Action_1.Action(ActionType.increment); },
    addValue: function (value) { return new Action_1.Action(ActionType.addValue, value); },
    decrement: function () { return new Action_1.Action(ActionType.decrement); }
});
//# sourceMappingURL=CounterAction.js.map