import {Store, StoreContext} from "../../src/ts/Store";
import {AsyncUserAction} from "./AsyncUserAction";
import {AsyncUserState} from "./AsyncUserState";
import {Future, Option} from "utilitaire";
import {User} from "./User";

type AsyncUserActionType = typeof AsyncUserAction.Types;

const getUserById = (userId:string) =>
    Future.executeAfter<User>(3000, () => { return { username : "JohnDoe" } });

// @ts-ignore
export const AsyncUserStore = Store.create<AsyncUserState, AsyncUserActionType>(AsyncUserAction.Types, {

    initialState : {
        userFuture : Future.notYetStarted<User>()
    },

    withCurrentState : {
        setUser: (currentState:AsyncUserState, userId: string) => {
            // get the user by its id
            const futureUser = getUserById(userId);

            // Watch this future for completion (either with value or with error
            AsyncUserStore.watchFuture(futureUser);

            // Then we return the new state
            // @ts-ignore
            return Object.assign({}, currentState, {
                userFuture: futureUser
            });
        },
    }
});