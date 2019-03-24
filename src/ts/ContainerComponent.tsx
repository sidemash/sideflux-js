import * as React from "react";
import {Store} from "./Store";
import {HasDescriptor, JsObject} from "utilitaire";


export abstract class PureContainerComponent<T, U extends HasDescriptor<U>> extends React.PureComponent<T, JsObject>{
    protected store:Store<U>;
    protected constructor(props:T, store:Store<U>){
        super(props);
        this.setStore(store);
    }

    get currentState() : U { return this.store.currentState;  }

    componentWillUnmount(){
        this.store.unregister(this);
    }

    private setStore(store:Store<U>){
        store.register(this);
        this.store = store;
        this.state = store.currentState.desc;
    }

    onStateUpdated() : void {
        //this.setState(this.store.currentState.desc);
        this.forceUpdate();
    }
}

export abstract class ContainerComponent<T, U extends HasDescriptor<U>> extends React.Component<T, JsObject>{
    protected store:Store<U>;
    protected constructor(props:T, store:Store<U>){
        super(props);
        this.setStore(store);
    }

   private setStore(store:Store<U>){
        store.register(this);
        this.store = store;
        this.state = store.currentState.desc;
    }

    get currentState() : U { return this.store.currentState;  }

    componentWillUnmount(){
        this.store.unregister(this);
    }

    onStateUpdated() : void {
        // We are using a data structure { data : .... }, because of the definition
        // of setState : according to the official documentation, it will "merge" the
        // old state with the new one. I don't know how this "merge" will work but it is clear
        // that the state have to be an instance of a "mergeable" type.
        //
        // That prevent me to use my own immutable object
        // as i don't know what "mergeable" means for facebook !!
        // I have made some tests, i know that primitive types (number, string) are "mergeables"
        // as well as object literal types. I have defined my own immutable object but this can't
        // be used as state because react
        // 1 - don't know how to merge this instance
        // 2 - don't provide me a way to specify it.
        // because of the  https://github.com/facebook/react/issues/3236
        // this.setState(this.store.currentState.desc);
        this.forceUpdate();
    }
}