"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AsyncUserStore_1 = require("./AsyncUserStore");
var AsyncUserAction_1 = require("./AsyncUserAction");
var Dispatcher_1 = require("../../src/ts/Dispatcher");
var ContainerComponent_1 = require("../../src/ts/ContainerComponent");
var AsyncUser = (function (_super) {
    __extends(AsyncUser, _super);
    function AsyncUser(props) {
        return _super.call(this, props, AsyncUserStore_1.AsyncUserStore) || this;
    }
    AsyncUser.prototype.refresh = function () {
        Dispatcher_1.GlobalDispatcher.dispatch(AsyncUserAction_1.AsyncUserAction.setUser(this.props.userId));
    };
    AsyncUser.prototype.render = function () {
        var _this = this;
        var userFuture = this.store.currentState.userFuture;
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return _this.refresh(); } }, "Refresh "),
            userFuture.fold({
                ifNotYetStarted: function () { return React.createElement("p", null, "Initialising ...."); },
                ifFailure: function (error) { return React.createElement("p", null, "An error has occurred"); },
                ifPending: function () { return React.createElement("p", null, "Loading ..."); },
                ifSuccess: function (user) {
                    return React.createElement("div", null,
                        React.createElement("p", null,
                            "Username : ",
                            user.username));
                }
            })));
    };
    return AsyncUser;
}(ContainerComponent_1.ContainerComponent));
exports.AsyncUser = AsyncUser;
//# sourceMappingURL=AsyncUserComponent.js.map