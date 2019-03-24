import * as React from "react";
import {CounterStore} from "./CounterStore";
import {GlobalDispatcher} from "../../src/ts/Dispatcher";
import {CounterAction} from "./CounterAction";
import {ContainerComponent} from "../../src/ts/ContainerComponent";
import {CounterState} from "./CounterState";


export class Counter extends ContainerComponent<{}, CounterState>{

    constructor(props:{}){
        super(props, CounterStore)
    }

    increment(){
        GlobalDispatcher.dispatch(
            CounterAction.addValue(12)
        )
    }

    decrement(){
        GlobalDispatcher.dispatch(CounterAction.decrement())
    }

    render() {
        const counter = this.store.currentState;
        return (
            <div>
                <button onClick={() => this.increment()}>+</button>
                <span>{counter}</span>
                <button onClick={() => this.decrement()}>-</button>
            </div>
        );
    }
}