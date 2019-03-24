"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ContainerComponent = (function (_super) {
    __extends(ContainerComponent, _super);
    function ContainerComponent(props, store) {
        var _this = _super.call(this, props) || this;
        _this.store = store;
        _this.store.register(_this);
        _this.state = {
            data: store.initialState
        };
        return _this;
    }
    ContainerComponent.prototype.componentWillUnmount = function () {
        this.store.unregister(this);
    };
    ContainerComponent.prototype.onStateUpdated = function () {
        this.setState({
            data: this.store.currentState
        });
    };
    return ContainerComponent;
}(React.Component));
exports.ContainerComponent = ContainerComponent;
