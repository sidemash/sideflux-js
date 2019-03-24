import {Map, Set} from "immutable";
import {Store} from "./Store";
import {Action} from "./Action";

export class Dispatcher {

    /**
     * This variable act as a "routing table" for the dispatcher.
     * To an Action name, this map associates every stores
     * that has been registered to handle it.
     */
    public dispatchTable = Map<string, Set<Store<any>>>();


    /**
     * Register a Store to a dispatcher.
     * @param store
     * @returns {GlobalDispatcher}
     */
    register(store:Store<any>): this {
        store.handledActionsTypes.forEach(name => {
            if (this.dispatchTable.get(name) == undefined)
                this.dispatchTable = this.dispatchTable.set(name, Set.of(store));
            else
                this.dispatchTable = this.dispatchTable.update(name, storeSet => storeSet.add(store))
        });
        return this;
    }


    /**
     * Dispatch the Action to all store registered to handle it.
     * @param action
     */
    dispatch(action:Action) : void {
        const storeSet: Set<Store<any>> = this.dispatchTable.get(action.name);
        if(storeSet == undefined){
            throw new Error("Have you registered your store ? Store NOT found to handle Action : " + action.name);
        }
        else {
            storeSet.forEach(el => el.handleAction(action));
        }
    }
}

export const GlobalDispatcher =  new Dispatcher();
