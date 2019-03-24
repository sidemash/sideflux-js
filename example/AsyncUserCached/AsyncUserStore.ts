import {Store, StoreContext} from "../../src/ts/Store";
import {AsyncUserAction} from "./AsyncUserAction";
import {AsyncUserState} from "./AsyncUserState";
import {Future, Option} from "utilitaire";
import {User} from "./UserCached";

type AsyncUserActionType = typeof AsyncUserAction.Types;


// Simulate the server call
const getUserById = (userId:string) =>
    Future.executeAfter<User>(3000, () => { return new User({ username : "JohnDoe", id  : "123456" }); });


// Simulate the registering the network result in to the cache
/*
 Sdm.Service
 .onResourceArrived(resource => DataCache.addResource(resource))
 .onCollectionArrived(collection => DataCache.addCollection(collection));

 Sdm.Service.RealTimeNotification
 .onNotification(notif => {
 const operation = notif.operation;
 // If there is no resource, then the initiator of the operation is the resource to update
 const resource = operation.resourceOption.valueOrElse(notif.operation.initiator);
 DataCache.addResource(resource);
 });


 */
// @ts-ignore
export const AsyncUserStore = Store.create<AsyncUserState, AsyncUserActionType>(AsyncUserAction.Types, {

    initialState: {
        userOption: Option.empty<Future<User>>()
    },


    withCurrentState : {
        setUser: (currentState:AsyncUserState, userId: string) => {
            // Get the user by its id
            const futureUser = AsyncUserStore.cache.getDataFuture<User>({
                dataId: userId,
                ifDataMiss: () => getUserById(userId)
            });

            // There is no need to watch the future for completion
            // here is why :
            // If the user has already been fetch from the server, then
            // it will be already in the cache and the futureUser
            // is completed -> no need to watch it
            // else if the data misses, then the function will be called
            // and once the server respond, the Cache will notify this store
            // as it is configured to notify the store -> no need to watch :=)

            // Then we return the new state
            // @ts-ignore
            return Object.assign({}, currentState, {
                userOption: Option.of(futureUser)
            });
        },
    }
});