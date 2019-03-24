import {Set} from "immutable";
import * as _ from "lodash"
import {Action} from "./Action";
import {GlobalDispatcher} from "./Dispatcher";
import {ContainerComponent, PureContainerComponent} from "./ContainerComponent";
import {Future, HasDescriptor, JsObject, Option} from "utilitaire";
import {CachableData} from "./data/DataState";
import {DataCache} from "./data/DataCache";
import {DataCacheEvent} from "./data/DataCacheEvent";


export type StoreDesc<T, U> = {
    initialState : T ,
    initialStateFn ?: () => T,

    updatedBy ?: Array<Store<any>>
    dependsOn ?: Array<Store<any>>
    onDataCacheEvent ?: (dataCacheEvent:DataCacheEvent) => void

    withStoreContext ?: {  [P in keyof U ] ?: (context:StoreContext<T>, ...any) => T }
    withCurrentState ?: {  [P in keyof U ] ?: (currentState:T, ...any) => T }

    onDataChanged ?: (data:any) => void
}
export type ManagedComponent = ContainerComponent<any, any> |  PureContainerComponent<any, any>

/**
 * Abstract Store that hold a state of type T
 * NOTE : When extending this class, T have to be a type those values
 *        are immutable.
 */

export class Store<T extends HasDescriptor<T>> {

    private registeredOnChangedFn : Array< (oldState:T, newState:T) => void> = [];
    readonly cache : StoreCache = new StoreCache(this);

    private constructor(readonly initialState: T,
                        readonly handledActionsTypes : Array<string>,
                        readonly descriptor : StoreDesc<T, any>,
                        private _currentState:T){
        GlobalDispatcher.register(this);
    }


    get currentState() : T { return this._currentState; }

    /**
     * Set of all React Component that are managed by this Store.
     * This is the Set of all components that should be re-rendered
     * whenever this store change its state.
     * @type {Set<Container.Component<any, {}>>}
     */
    protected managedComponents : Set<ManagedComponent> = Set<ManagedComponent>();


    static create<T extends HasDescriptor<T>, U>(actionsTypes:U, descriptor : StoreDesc<T, U>) : Store<T> {
        const initialState = descriptor.initialState;
        const currentState = descriptor.initialState;
        const handledActionsTypes = Object.keys(actionsTypes).map(key => actionsTypes[key]);
        return new Store(initialState, handledActionsTypes, descriptor, currentState)
    }

    register(component:ManagedComponent) : this {
        this.managedComponents = this.managedComponents.add(component);
        return this;
    }

    unregister(component:ManagedComponent) : this {
        this.managedComponents = this.managedComponents.remove(component);
        return this;
    }

    notifyComponents() : void {
        this.managedComponents.forEach(component => component.onStateUpdated());
    }

    watchFuture<T>(future : Future<T>) : Future<T> {
        future.onComplete( () => {
            this.notifyComponents();
        });
        return future;
    }

    onDataChanged(data:any) {
        const onDataChanged =
            this.descriptor.withStoreContext && this.descriptor.withStoreContext.onDataChanged  ||
            this.descriptor.withCurrentState && this.descriptor.withCurrentState.onDataChanged;
        if(onDataChanged != undefined) {
            this.handleAction(Action.onDataChanged(data))
        }
        else {
            this.notifyComponents();
        }
    }

    onUpdate(fn : (oldState:T, newState:T) => void ) {
        this.registeredOnChangedFn.push(fn);
    }

    dispatch(action:Action) {
        this.handleAction(action);
    }

    handleAction(action:Action) {

        if(_.isUndefined(this.descriptor.withCurrentState) && _.isUndefined(this.descriptor.withStoreContext)){
            console.error("Store.withCurrentState or  Store.withStoreContext where not defined. Impossible to have method to handle the action '" + action.name+ "'");
            if(_.isUndefined(this.descriptor.withCurrentState[action.name]) && _.isUndefined(this.descriptor.withStoreContext[action.name]))
                console.error("No method registered in Store.withCurrentState or in Store.withStoreContext to handle the action '" + action.name+ "'");

            console.log("Here is the descriptor of the Store : ", this.descriptor);
            return ;
        }
        // Cache the old state
        const oldState = this._currentState;
        let context : RunnableStoreContext<T>;
        let newState : T ;

        // Find the right method and Apply it with its args
        const methodForActionDoNotNeedContext = this.descriptor.withCurrentState != undefined && this.descriptor.withCurrentState[action.name] != undefined ;
        const methodForActionNeedContext = this.descriptor.withStoreContext != undefined && this.descriptor.withStoreContext[action.name] != undefined ;
        if(methodForActionDoNotNeedContext){
            newState = this.descriptor.withCurrentState[action.name](oldState,  ...action.params) as T;
        }
        else if(methodForActionNeedContext){
            // Create a context from old state
            context = new RunnableStoreContext({ currentState : oldState });
            newState = this.descriptor.withStoreContext[action.name](context,  ...action.params) as T;
        }
        else {
            // There was No method registered to handle the action
            console.log(action);
            throw new Error(`No method registered to handle the action '${action.name}'`)
        }

        // TODO : Check if the oldState and the new are different then do all the following
        // Updating the state
        this._currentState = newState;

        // Execute on changed
        this.registeredOnChangedFn.forEach(fn => fn(oldState, newState));

        // notify all components that need to be notified
        this.notifyComponents();

        // Execute all callbacks registered
        context && context.notifyAllComponentsUpdated()
    }
}

export type StoreContextDesc<T> = {
    currentState : T
}

export class StoreContext<T> {

    protected functions : Array<() => void> = [];

    constructor(protected desc:StoreContextDesc<T>){}

    get currentState() : T { return this.desc.currentState; }

    onAllComponentsUpdated(fn : () => void ) : StoreContext<T> {
        this.functions.push(fn);
        return this;
    }
}

class RunnableStoreContext<T> extends StoreContext<T> {
    constructor(protected desc:StoreContextDesc<T>){ super(desc)}

    notifyAllComponentsUpdated(){
        this.functions.forEach(fn => fn());
    }
}

export class StoreCache {

    constructor(protected store:Store<any>){}

    getData<U extends CachableData<any>>(by : { dataId : string }) : U {
        return (
            DataCache.getData<U>({
                dataId : by.dataId,
                notifyWhenDataChanges : this.store
            })
        );
    }

    getDataFuture<U extends CachableData<any>>(by : { dataId : string, ifDataMiss : () =>  Future<U>}) : Future<U> {
        return (
            DataCache.getDataFuture<U>({
                dataId : by.dataId,
                ifDataMiss : by.ifDataMiss,
                notifyWhenDataChanges : this.store
            })
        );
    }

    getDataOption<U extends CachableData<any>>(by : { dataId : string }) : Option<U> {
        return  (
            DataCache.getDataOption<U>({
                dataId : by.dataId,
                notifyWhenDataChanges : this.store
            })
        );
    }
}