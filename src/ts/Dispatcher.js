"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var Dispatcher = (function () {
    function Dispatcher() {
        this.dispatchTable = immutable_1.Map();
    }
    Dispatcher.prototype.register = function (store) {
        var _this = this;
        store.handledActionsTypes.forEach(function (name) {
            if (_this.dispatchTable.get(name) == undefined)
                _this.dispatchTable = _this.dispatchTable.set(name, immutable_1.Set.of(store));
            else
                _this.dispatchTable = _this.dispatchTable.update(name, function (storeSet) { return storeSet.add(store); });
        });
        return this;
    };
    Dispatcher.prototype.dispatch = function (action) {
        var storeSet = this.dispatchTable.get(action.name);
        if (storeSet == undefined) {
            throw new Error("Have you registered your store ? Store NOT found to handle Action : " + action.name);
        }
        else {
            storeSet.forEach(function (el) { return el.handleAction(action); });
        }
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
exports.GlobalDispatcher = new Dispatcher();
//# sourceMappingURL=Dispatcher.js.map