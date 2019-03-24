"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitaire_1 = require("utilitaire");
var Action = (function () {
    function Action(name) {
        var _params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _params[_i - 1] = arguments[_i];
        }
        this.name = name;
        this.params = _params;
    }
    Action.from = function (actionTypes, descriptor) {
        var r1 = { Types: utilitaire_1.onlyReadable(actionTypes) };
        var result = Object.assign(r1, descriptor);
        return utilitaire_1.onlyReadable(result);
    };
    Action.onDataChanged = function (data) { return new Action("onDataChanged", data); };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=Action.js.map