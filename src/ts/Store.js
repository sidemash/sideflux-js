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
var immutable_1 = require("immutable");
var _ = require("lodash");
var Action_1 = require("./Action");
var Dispatcher_1 = require("./Dispatcher");
var DataCache_1 = require("./data/DataCache");
var Store = (function () {
    function Store(initialState, handledActionsTypes, descriptor, _currentState) {
        this.initialState = initialState;
        this.handledActionsTypes = handledActionsTypes;
        this.descriptor = descriptor;
        this._currentState = _currentState;
        this.registeredOnChangedFn = [];
        this.cache = new StoreCache(this);
        this.managedComponents = immutable_1.Set();
        Dispatcher_1.GlobalDispatcher.register(this);
    }
    Object.defineProperty(Store.prototype, "currentState", {
        get: function () { return this._currentState; },
        enumerable: true,
        configurable: true
    });
    Store.create = function (actionsTypes, descriptor) {
        var initialState = descriptor.initialState;
        var currentState = descriptor.initialState;
        var handledActionsTypes = Object.keys(actionsTypes).map(function (key) { return actionsTypes[key]; });
        return new Store(initialState, handledActionsTypes, descriptor, currentState);
    };
    Store.prototype.register = function (component) {
        this.managedComponents = this.managedComponents.add(component);
        return this;
    };
    Store.prototype.unregister = function (component) {
        this.managedComponents = this.managedComponents.remove(component);
        return this;
    };
    Store.prototype.notifyComponents = function () {
        this.managedComponents.forEach(function (component) { return component.onStateUpdated(); });
    };
    Store.prototype.watchFuture = function (future) {
        var _this = this;
        future.onComplete(function () {
            _this.notifyComponents();
        });
        return future;
    };
    Store.prototype.onDataChanged = function (data) {
        var onDataChanged = this.descriptor.withStoreContext && this.descriptor.withStoreContext.onDataChanged ||
            this.descriptor.withCurrentState && this.descriptor.withCurrentState.onDataChanged;
        if (onDataChanged != undefined) {
            this.handleAction(Action_1.Action.onDataChanged(data));
        }
        else {
            this.notifyComponents();
        }
    };
    Store.prototype.onUpdate = function (fn) {
        this.registeredOnChangedFn.push(fn);
    };
    Store.prototype.dispatch = function (action) {
        this.handleAction(action);
    };
    Store.prototype.handleAction = function (action) {
        var _a, _b;
        if (_.isUndefined(this.descriptor.withCurrentState) && _.isUndefined(this.descriptor.withStoreContext)) {
            console.error("Store.withCurrentState or  Store.withStoreContext where not defined. Impossible to have method to handle the action '" + action.name + "'");
            if (_.isUndefined(this.descriptor.withCurrentState[action.name]) && _.isUndefined(this.descriptor.withStoreContext[action.name]))
                console.error("No method registered in Store.withCurrentState or in Store.withStoreContext to handle the action '" + action.name + "'");
            console.log("Here is the descriptor of the Store : ", this.descriptor);
            return;
        }
        var oldState = this._currentState;
        var context;
        var newState;
        var methodForActionDoNotNeedContext = this.descriptor.withCurrentState != undefined && this.descriptor.withCurrentState[action.name] != undefined;
        var methodForActionNeedContext = this.descriptor.withStoreContext != undefined && this.descriptor.withStoreContext[action.name] != undefined;
        if (methodForActionDoNotNeedContext) {
            newState = (_a = this.descriptor.withCurrentState)[action.name].apply(_a, [oldState].concat(action.params));
        }
        else if (methodForActionNeedContext) {
            context = new RunnableStoreContext({ currentState: oldState });
            newState = (_b = this.descriptor.withStoreContext)[action.name].apply(_b, [context].concat(action.params));
        }
        else {
            console.log(action);
            throw new Error("No method registered to handle the action '" + action.name + "'");
        }
        this._currentState = newState;
        this.registeredOnChangedFn.forEach(function (fn) { return fn(oldState, newState); });
        this.notifyComponents();
        context && context.notifyAllComponentsUpdated();
    };
    return Store;
}());
exports.Store = Store;
var StoreContext = (function () {
    function StoreContext(desc) {
        this.desc = desc;
        this.functions = [];
    }
    Object.defineProperty(StoreContext.prototype, "currentState", {
        get: function () { return this.desc.currentState; },
        enumerable: true,
        configurable: true
    });
    StoreContext.prototype.onAllComponentsUpdated = function (fn) {
        this.functions.push(fn);
        return this;
    };
    return StoreContext;
}());
exports.StoreContext = StoreContext;
var RunnableStoreContext = (function (_super) {
    __extends(RunnableStoreContext, _super);
    function RunnableStoreContext(desc) {
        var _this = _super.call(this, desc) || this;
        _this.desc = desc;
        return _this;
    }
    RunnableStoreContext.prototype.notifyAllComponentsUpdated = function () {
        this.functions.forEach(function (fn) { return fn(); });
    };
    return RunnableStoreContext;
}(StoreContext));
var StoreCache = (function () {
    function StoreCache(store) {
        this.store = store;
    }
    StoreCache.prototype.getData = function (by) {
        return (DataCache_1.DataCache.getData({
            dataId: by.dataId,
            notifyWhenDataChanges: this.store
        }));
    };
    StoreCache.prototype.getDataFuture = function (by) {
        return (DataCache_1.DataCache.getDataFuture({
            dataId: by.dataId,
            ifDataMiss: by.ifDataMiss,
            notifyWhenDataChanges: this.store
        }));
    };
    StoreCache.prototype.getDataOption = function (by) {
        return (DataCache_1.DataCache.getDataOption({
            dataId: by.dataId,
            notifyWhenDataChanges: this.store
        }));
    };
    return StoreCache;
}());
exports.StoreCache = StoreCache;
//# sourceMappingURL=Store.js.map