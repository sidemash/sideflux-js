import {Action} from "../../src/ts/Action";

const ActionType = {
    setUser : "setUser"
};

export const AsyncUserAction = Action.from(ActionType, {
    setUser  : (userId:string) => new Action(ActionType.setUser, userId),
});


