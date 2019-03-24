"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var CounterStore_1 = require("./CounterStore");
var Dispatcher_1 = require("../../Dispatcher");
var CounterAction_1 = require("./CounterAction");
var ContainerComponent_1 = require("../../ContainerComponent");
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter(props) {
        return _super.call(this, props, CounterStore_1.CounterStore) || this;
    }
    Counter.prototype.increment = function () {
        Dispatcher_1.Dispatcher.dispatch(CounterAction_1.CounterAction.increment());
    };
    Counter.prototype.decrement = function () {
        Dispatcher_1.Dispatcher.dispatch(CounterAction_1.CounterAction.decrement());
    };
    Counter.prototype.render = function () {
        var _this = this;
        var counter = this.state.data;
        return (<div>
                <button onClick={function () { return _this.increment(); }}>+</button>
                <span>{counter}</span>
                <button onClick={function () { return _this.decrement(); }}>-</button>
            </div>);
    };
    return Counter;
}(ContainerComponent_1.ContainerComponent));
exports.Counter = Counter;
