import {Action} from "./Action";


export const GenericActionType = {
    tryToInitialize  : "tryToInitialize",
    initializedWithSuccess  : "initializedWithSuccess",
    failedToInitialize  : "failedToInitialize"
};

export class GenericActionImpl {

    tryToInitialize(value ?: any){
        return new Action(GenericActionType.tryToInitialize, value)
    }

    initializedWithSuccess<T>(value : T){
        return new Action(GenericActionType.initializedWithSuccess, value)
    }

    failedToInitialize<T>(value : T){
        return new Action(GenericActionType.failedToInitialize, value)
    }
}

export const GenericAction = new GenericActionImpl();
