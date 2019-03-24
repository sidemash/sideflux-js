"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../src/ts/Store");
var AsyncUserAction_1 = require("./AsyncUserAction");
var utilitaire_1 = require("utilitaire");
var getUserById = function (userId) {
    return utilitaire_1.Future.executeAfter(3000, function () { return { username: "JohnDoe" }; });
};
exports.AsyncUserStore = Store_1.Store.create(AsyncUserAction_1.AsyncUserAction.Types, {
    initialState: {
        userFuture: utilitaire_1.Future.notYetStarted()
    },
    withCurrentState: {
        setUser: function (currentState, userId) {
            var futureUser = getUserById(userId);
            exports.AsyncUserStore.watchFuture(futureUser);
            return Object.assign({}, currentState, {
                userFuture: futureUser
            });
        },
    }
});
//# sourceMappingURL=AsyncUserStore.js.map