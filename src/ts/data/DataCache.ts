import {Set, Map} from "immutable";
import * as _ from "lodash"
import {Store} from "../Store";
import {DataState, CachableData} from "./DataState";
import {Option} from "utilitaire";
import {Future} from "utilitaire";

export class DataCacheImpl {

    // private registeredStores = Set<Store<any>>();
    // For each data id, contains all the stores to notify when the data chenges
    private registeredStoresByDataId = Map<string, Set<Store<any>>>();


    constructor(protected _state:DataState){}

    /*
     registerForDataChanges2(param : { dataId:string, notifyWhenDataChanges: Store<any>}) : this {
     const setOfStoresToNotify =
     (this.registeredStoresByDataId.has(param.dataId))
     ? this.registeredStoresByDataId.get(param.dataId)
     : Set<Store<any>>();

     this.registeredStoresByDataId =
     this.registeredStoresByDataId.set(
     param.dataId,
     setOfStoresToNotify.add(param.notifyWhenDataChanges)
     );
     return this;
     }
     */

    registerForDataChanges(param : { dataId: string, notifyWhenDataChanges ?: Store<any>}) : this {

        try {


        if(Option.of(param.notifyWhenDataChanges).isEmpty()) return this;

        const notifyForOneDataId = (dataId:string) => {
            const setOfStoresToNotify =
                (this.registeredStoresByDataId.has(dataId))
                    ? this.registeredStoresByDataId.get(dataId)
                    : Set<Store<any>>();

            this.registeredStoresByDataId =
                this.registeredStoresByDataId.set(
                    dataId,
                    setOfStoresToNotify.add(param.notifyWhenDataChanges)
                );
        };
        const data = this._state.dataMap.get(param.dataId);
        let allDataIds = [param.dataId];
        if(data) {
            const embedResourcesIds : Array<string> = data.split().map(embedResource => embedResource.id);
            allDataIds = _.union(allDataIds, embedResourcesIds);
        }
        allDataIds.forEach(notifyForOneDataId);
        return this;

        } catch (e){
            console.log("Error occurred in datacache registerForDatChange ", e)
        }
    }

    add(data: CachableData<any>) : this {
        try {
            const allDatasToAdd: Array<CachableData<any>> = data.split();

            // We then add the data itself to the splitted  array
            allDatasToAdd.push(data);

            // We add the embedded data
            const newMap = allDatasToAdd.reduce(
                // update(key: K, notSetValue: V, updater: (value: V) => V): Map<K, V>;
                (map: Map<string, CachableData<any>>, el: CachableData<any>) => map.set(el.id,  el),
                this._state.dataMap
            );

            // Update the state
            this._state = this._state.copy({
                dataMap: newMap
            });

            // We notify the registered stores
            if(this.registeredStoresByDataId.has(data.id))
                this.registeredStoresByDataId.get(data.id).forEach(store => {
                    store.onDataChanged(data)
                });

            return this;
        } catch (e){
            console.log("Error occured in datacache add ", e)
        }
    }

    addAll(array : Array<CachableData<any>>) : this{
        array.forEach(resource => this.add(resource));
        return this;
    }

    getData<T extends CachableData<any>>(param : { dataId:string, notifyWhenDataChanges ?: Store<any>}) : T {
        this.registerForDataChanges(param);
        return this.getDataOption<T>(param).value;
    }

    getDataFuture<T extends CachableData<any>>(param : { dataId:string, notifyWhenDataChanges ?: Store<any>, ifDataMiss : () =>  Future<T>}) : Future<T> {
        this.registerForDataChanges(param);
        const dataOption = this.getDataOption<T>(param);

        if(dataOption.isEmpty()) return param.ifDataMiss();
        else return Future.successful<T>(dataOption.value);
    }

    getDataOption<T extends CachableData<any>>(param:{ dataId:string, notifyWhenDataChanges ?: Store<any>}) : Option<T> {
        this.registerForDataChanges(param);
        const data = this._state.dataMap.get(param.dataId);
        if(!data) return Option.empty<T>();

        // We update the embed resources
        const result =
            data.merge(
                // We know for sure that 'this._state.dataMap.get(id)' won't be empty
                // because the dataMap has been set when the data was added
                data.split().map(embedResource => this._state.dataMap.get(embedResource.id))
            );

        return Option.of<T>(result as T);
    }
}


export const DataCache = new DataCacheImpl(DataState.getInitialState());