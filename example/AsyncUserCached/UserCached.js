"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(desc) {
        this.desc = desc;
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () { return this.desc.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        get: function () { return this.desc.username; },
        enumerable: true,
        configurable: true
    });
    User.prototype.split = function () {
        return [];
    };
    User.prototype.merge = function (resources) {
        return this;
    };
    User.prototype.copy = function (desc) {
        return new User(Object.assign({}, this.desc, desc));
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=UserCached.js.map