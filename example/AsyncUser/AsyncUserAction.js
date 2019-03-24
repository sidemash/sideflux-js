"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../../src/ts/Action");
var ActionType = {
    setUser: "setUser"
};
exports.AsyncUserAction = Action_1.Action.from(ActionType, {
    setUser: function (userId) { return new Action_1.Action(ActionType.setUser, userId); },
});
//# sourceMappingURL=AsyncUserAction.js.map