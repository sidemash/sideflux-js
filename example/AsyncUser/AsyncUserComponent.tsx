import * as React from "react";
import {AsyncUserStore} from "./AsyncUserStore";
import {AsyncUserAction} from "./AsyncUserAction";
import {Future} from "utilitaire";
import {User} from "./User";
import {GlobalDispatcher} from "../../src/ts/Dispatcher";
import {ContainerComponent} from "../../src/ts/ContainerComponent";
import {AsyncUserState} from "./AsyncUserState";


export type AsyncUserProps = { userId : string }
/**
 * Here We are extending Container Component becuase
 */

    // @ts-ignore
export class AsyncUser extends ContainerComponent<AsyncUserProps, AsyncUserState>{

    constructor(props:AsyncUserProps){
        super(props, AsyncUserStore)
    }

    refresh() {
        GlobalDispatcher.dispatch(
            AsyncUserAction.setUser(this.props.userId)
        );
    }

    render() {
        const userFuture : Future<User> = this.store.currentState.userFuture;
        return (
            <div>
                <button onClick={() => this.refresh()}>Refresh </button>
                {
                    userFuture.fold({
                        ifNotYetStarted : () => <p>Initialising ....</p>,
                        ifFailure : error => <p>An error has occurred</p>,
                        ifPending : ()  =>   <p>Loading ...</p>,
                        ifSuccess : user =>
                            <div>
                                <p>Username : { user.username }</p>
                            </div>
                    })
                }
            </div>
        );
    }
}