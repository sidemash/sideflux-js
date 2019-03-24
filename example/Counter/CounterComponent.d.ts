import { ContainerComponent } from "../../src/ts/ContainerComponent";
import { CounterState } from "./CounterState";
export declare class Counter extends ContainerComponent<{}, CounterState> {
    constructor(props: {});
    increment(): void;
    decrement(): void;
    render(): JSX.Element;
}
