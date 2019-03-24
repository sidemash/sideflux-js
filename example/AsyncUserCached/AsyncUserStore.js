"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../src/ts/Store");
var AsyncUserAction_1 = require("./AsyncUserAction");
var utilitaire_1 = require("utilitaire");
var UserCached_1 = require("./UserCached");
var getUserById = function (userId) {
    return utilitaire_1.Future.executeAfter(3000, function () { return new UserCached_1.User({ username: "JohnDoe", id: "123456" }); });
};
exports.AsyncUserStore = Store_1.Store.create(AsyncUserAction_1.AsyncUserAction.Types, {
    initialState: {
        userOption: utilitaire_1.Option.empty()
    },
    withCurrentState: {
        setUser: function (currentState, userId) {
            var futureUser = exports.AsyncUserStore.cache.getDataFuture({
                dataId: userId,
                ifDataMiss: function () { return getUserById(userId); }
            });
            return Object.assign({}, currentState, {
                userOption: utilitaire_1.Option.of(futureUser)
            });
        },
    }
});
//# sourceMappingURL=AsyncUserStore.js.map