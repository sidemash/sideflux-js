"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataCacheEvent = (function () {
    function DataCacheEvent(_data) {
        this._data = _data;
    }
    Object.defineProperty(DataCacheEvent.prototype, "name", {
        get: function () { return "DataCacheEvent"; },
        enumerable: true,
        configurable: true
    });
    DataCacheEvent.prototype.isCreated = function () { return false; };
    DataCacheEvent.prototype.isUpdated = function () { return false; };
    DataCacheEvent.prototype.isDeleted = function () { return false; };
    DataCacheEvent.prototype.ifIsCreated = function (fn) {
        if (this.isCreated()) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsCreatedOrUpdated = function (fn) {
        if (this.isCreated()) {
            fn(this._data);
        }
        else if (this.isUpdated()) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsUpdated = function (fn) {
        if (this.isUpdated()) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsDeleted = function (fn) {
        if (this.isDeleted()) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsCreatedAndMatch = function (predicate, fn) {
        if (this.isCreated() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsUpdatedAndMatch = function (predicate, fn) {
        if (this.isUpdated() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    };
    DataCacheEvent.prototype.ifIsDeletedAndMatch = function (predicate, fn) {
        if (this.isDeleted() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    };
    return DataCacheEvent;
}());
exports.DataCacheEvent = DataCacheEvent;
//# sourceMappingURL=DataCacheEvent.js.map