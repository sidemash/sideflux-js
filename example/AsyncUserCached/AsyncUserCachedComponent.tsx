import * as React from "react";
import {AsyncUserStore} from "./AsyncUserStore";
import {AsyncUserAction} from "./AsyncUserAction";
import {Future, Option} from "utilitaire";
import {User} from "./UserCached";
import {GlobalDispatcher} from "../../src/ts/Dispatcher";
import {ContainerComponent} from "../../src/ts/ContainerComponent";
import {AsyncUserState} from "./AsyncUserState";


export type AsyncUserProps = { userId : string }
/**
 * Here We are extending Container Component becuase
 */

    // @ts-ignore
export class AsyncUserCached extends ContainerComponent<AsyncUserProps, AsyncUserState>{

    constructor(props:AsyncUserProps){
        super(props, AsyncUserStore)
    }

    refresh() {
        GlobalDispatcher.dispatch(
            AsyncUserAction.setUser(this.props.userId)
        );
    }

    render() {
        const userOption : Option<Future<User>> = this.store.currentState.userOption;
        return (
            <div>
                <button onClick={() => this.refresh()}>Refresh </button>
                {
                    userOption.map(userFuture =>
                        userFuture.fold({
                            ifFailure : error => <p>An error has occurred</p>,
                            ifPending : ()  =>   <p>Loading ...</p>,
                            ifSuccess : user =>
                                <div>
                                    <p>Username : { user.username }</p>
                                </div>
                        })
                    ).valueOrElse(<p>Initialising ....</p>)
                }
            </div>
        );
    }
}