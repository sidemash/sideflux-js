"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var AsyncUserStore_1 = require("./AsyncUserStore");
var AsyncUserAction_1 = require("./AsyncUserAction");
var Dispatcher_1 = require("../../Dispatcher");
var ContainerComponent_1 = require("../../ContainerComponent");
/**
 * Here We are extending Container Component becuase
 */
var AsyncUser = (function (_super) {
    __extends(AsyncUser, _super);
    function AsyncUser(props) {
        return _super.call(this, props, AsyncUserStore_1.AsyncUserStore) || this;
    }
    AsyncUser.prototype.refresh = function () {
        Dispatcher_1.Dispatcher.dispatch(AsyncUserAction_1.AsyncUserAction.setUser(this.props.userId));
    };
    AsyncUser.prototype.render = function () {
        var _this = this;
        var userOption = this.state.data.userOption;
        return (<div>
                <button onClick={function () { return _this.refresh(); }}>Refresh </button>
                {userOption.map(function (userFuture) {
            return userFuture.fold({
                ifFailure: function (error) { return <p>An error has occurred</p>; },
                ifPending: function () { return <p>Loading ...</p>; },
                ifSuccess: function (user) {
                    return <div>
                                        <p>Username : {user.username}</p>
                                    </div>;
                }
            });
        }).valueOrNull()}
            </div>);
    };
    return AsyncUser;
}(ContainerComponent_1.ContainerComponent));
exports.AsyncUser = AsyncUser;
