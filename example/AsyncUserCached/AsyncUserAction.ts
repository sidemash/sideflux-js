import {Action} from "../../src/ts/Action";
import {OnlyReadable} from "utilitaire";

const ActionType = {
    setUser : "setUser"
};

export const AsyncUserAction = Action.from(ActionType, {
    setUser  : (userId:string) => new Action(ActionType.setUser, userId),
});


