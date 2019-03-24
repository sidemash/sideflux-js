"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var DataState = (function () {
    function DataState(desc) {
        this.desc = desc;
    }
    DataState.getInitialState = function () { return DataState._initialState; };
    Object.defineProperty(DataState.prototype, "dataMap", {
        get: function () { return this.desc.dataMap; },
        enumerable: true,
        configurable: true
    });
    DataState.prototype.copy = function (newState) {
        return new DataState(Object.assign({}, this.desc, newState));
    };
    DataState._initialState = new DataState({
        dataMap: immutable_1.Map()
    });
    return DataState;
}());
exports.DataState = DataState;
//# sourceMappingURL=DataState.js.map