"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
exports.GenericActionType = {
    tryToInitialize: "tryToInitialize",
    initializedWithSuccess: "initializedWithSuccess",
    failedToInitialize: "failedToInitialize"
};
var GenericActionImpl = (function () {
    function GenericActionImpl() {
    }
    GenericActionImpl.prototype.tryToInitialize = function (value) {
        return new Action_1.Action(exports.GenericActionType.tryToInitialize, value);
    };
    GenericActionImpl.prototype.initializedWithSuccess = function (value) {
        return new Action_1.Action(exports.GenericActionType.initializedWithSuccess, value);
    };
    GenericActionImpl.prototype.failedToInitialize = function (value) {
        return new Action_1.Action(exports.GenericActionType.failedToInitialize, value);
    };
    return GenericActionImpl;
}());
exports.GenericActionImpl = GenericActionImpl;
exports.GenericAction = new GenericActionImpl();
//# sourceMappingURL=GenericAction.js.map