import {Map} from "immutable";
import {HasId, Partial, Copyable, Mergeable, Splittable} from "utilitaire";

export type CachableData<T> = HasId<T> &
        Mergeable<T, any> &
        Splittable<T, any>

export type DataStateDescriptor = {
    dataMap : Map<string, CachableData<any>>
}

export class DataState implements Copyable<DataState, Partial<DataStateDescriptor>>{

    constructor(private desc : DataStateDescriptor) {}

    static _initialState =
        new DataState({
            dataMap : Map<string, CachableData<any>>()
        });

    static getInitialState() { return DataState._initialState; }

    get dataMap() : Map<string, CachableData<any>> { return this.desc.dataMap; }

    copy(newState: Partial<DataStateDescriptor>): DataState {
        // @ts-ignore
        return new DataState(Object.assign({}, this.desc, newState));
    }
}