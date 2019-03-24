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
var AsyncUserCached = (function (_super) {
    __extends(AsyncUserCached, _super);
    function AsyncUserCached(props) {
        return _super.call(this, props, AsyncUserStore_1.AsyncUserStore) || this;
    }
    AsyncUserCached.prototype.refresh = function () {
        Dispatcher_1.GlobalDispatcher.dispatch(AsyncUserAction_1.AsyncUserAction.setUser(this.props.userId));
    };
    AsyncUserCached.prototype.render = function () {
        var _this = this;
        var userOption = this.store.currentState.userOption;
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return _this.refresh(); } }, "Refresh "),
            userOption.map(function (userFuture) {
                return userFuture.fold({
                    ifFailure: function (error) { return React.createElement("p", null, "An error has occurred"); },
                    ifPending: function () { return React.createElement("p", null, "Loading ..."); },
                    ifSuccess: function (user) {
                        return React.createElement("div", null,
                            React.createElement("p", null,
                                "Username : ",
                                user.username));
                    }
                });
            }).valueOrElse(React.createElement("p", null, "Initialising ...."))));
    };
    return AsyncUserCached;
}(ContainerComponent_1.ContainerComponent));
exports.AsyncUserCached = AsyncUserCached;
//# sourceMappingURL=AsyncUserCachedComponent.js.map