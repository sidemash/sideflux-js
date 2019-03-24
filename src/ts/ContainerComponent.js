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
var PureContainerComponent = (function (_super) {
    __extends(PureContainerComponent, _super);
    function PureContainerComponent(props, store) {
        var _this = _super.call(this, props) || this;
        _this.setStore(store);
        return _this;
    }
    Object.defineProperty(PureContainerComponent.prototype, "currentState", {
        get: function () { return this.store.currentState; },
        enumerable: true,
        configurable: true
    });
    PureContainerComponent.prototype.componentWillUnmount = function () {
        this.store.unregister(this);
    };
    PureContainerComponent.prototype.setStore = function (store) {
        store.register(this);
        this.store = store;
        this.state = store.currentState.desc;
    };
    PureContainerComponent.prototype.onStateUpdated = function () {
        this.forceUpdate();
    };
    return PureContainerComponent;
}(React.PureComponent));
exports.PureContainerComponent = PureContainerComponent;
var ContainerComponent = (function (_super) {
    __extends(ContainerComponent, _super);
    function ContainerComponent(props, store) {
        var _this = _super.call(this, props) || this;
        _this.setStore(store);
        return _this;
    }
    ContainerComponent.prototype.setStore = function (store) {
        store.register(this);
        this.store = store;
        this.state = store.currentState.desc;
    };
    Object.defineProperty(ContainerComponent.prototype, "currentState", {
        get: function () { return this.store.currentState; },
        enumerable: true,
        configurable: true
    });
    ContainerComponent.prototype.componentWillUnmount = function () {
        this.store.unregister(this);
    };
    ContainerComponent.prototype.onStateUpdated = function () {
        this.forceUpdate();
    };
    return ContainerComponent;
}(React.Component));
exports.ContainerComponent = ContainerComponent;
//# sourceMappingURL=ContainerComponent.js.map