"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CounterStore_1 = require("./CounterStore");
var Dispatcher_1 = require("../../src/ts/Dispatcher");
var CounterAction_1 = require("./CounterAction");
var ContainerComponent_1 = require("../../src/ts/ContainerComponent");
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter(props) {
        return _super.call(this, props, CounterStore_1.CounterStore) || this;
    }
    Counter.prototype.increment = function () {
        Dispatcher_1.GlobalDispatcher.dispatch(CounterAction_1.CounterAction.addValue(12));
    };
    Counter.prototype.decrement = function () {
        Dispatcher_1.GlobalDispatcher.dispatch(CounterAction_1.CounterAction.decrement());
    };
    Counter.prototype.render = function () {
        var _this = this;
        var counter = this.store.currentState;
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return _this.increment(); } }, "+"),
            React.createElement("span", null, counter),
            React.createElement("button", { onClick: function () { return _this.decrement(); } }, "-")));
    };
    return Counter;
}(ContainerComponent_1.ContainerComponent));
exports.Counter = Counter;
//# sourceMappingURL=CounterComponent.js.map