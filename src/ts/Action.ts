import {onlyReadable} from "utilitaire";


export type ActionType = {
    readonly [key : string] : string
};


export type ActionReturnType<T> = {  [U in keyof T ]: (...any) => Action }
export class Action {

    readonly params : any[];

    constructor(readonly name : string,
                ..._params : any[]){
        this.params = _params;
    }

    static from<T extends ActionType>(actionTypes:T, descriptor : ActionReturnType<T> )  {
        const r1 : { Types : Readonly<T> } = { Types : onlyReadable(actionTypes) };
        const result : ActionReturnType<T> & { Types : Readonly<T> } =
            // @ts-ignore
            Object.assign(r1, descriptor);
        return (onlyReadable(result) as typeof result);
    }

    static readonly onDataChanged = (data:any) => new Action("onDataChanged", data)
}