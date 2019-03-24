"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../src/ts/Store");
var CounterAction_1 = require("./CounterAction");
exports.CounterStore = Store_1.Store.create(CounterAction_1.CounterAction.Types, {
    initialState: { desc: { value: 0 } },
    withCurrentState: {
        increment: function (currentState) { return ({ desc: { value: currentState.desc.value + 1 } }); },
        decrement: function (currentState) { return ({ desc: { value: currentState.desc.value - 1 } }); },
        addValue: function (currentState, value) { return ({ desc: { value: currentState.desc.value + value } }); }
    }
});
//# sourceMappingURL=CounterStore.js.map