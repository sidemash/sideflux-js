
export abstract class State<T, U> {

    constructor(private desc : T) {}

    abstract getInitialState() : T

}