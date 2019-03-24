
import {Store, StoreContext} from "../../src/ts/Store";
import {CounterAction} from "./CounterAction";
import {CounterState} from "./CounterState";

type CounterActionType = typeof CounterAction.Types;

export const CounterStore = Store.create<CounterState, CounterActionType>(CounterAction.Types, {

    initialState : { desc : { value : 0 } },

    withCurrentState : {
        increment: (currentState:CounterState) => ({ desc : {value: currentState.desc.value + 1} }),
        decrement: (currentState:CounterState) => ({ desc : {value: currentState.desc.value - 1} }),
        addValue: (currentState:CounterState, value: number) => ({ desc : {value: currentState.desc.value + value} })
    }
});