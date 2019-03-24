"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var _ = require("lodash");
var DataState_1 = require("./DataState");
var utilitaire_1 = require("utilitaire");
var utilitaire_2 = require("utilitaire");
var DataCacheImpl = (function () {
    function DataCacheImpl(_state) {
        this._state = _state;
        this.registeredStoresByDataId = immutable_1.Map();
    }
    DataCacheImpl.prototype.registerForDataChanges = function (param) {
        var _this = this;
        try {
            if (utilitaire_1.Option.of(param.notifyWhenDataChanges).isEmpty())
                return this;
            var notifyForOneDataId = function (dataId) {
                var setOfStoresToNotify = (_this.registeredStoresByDataId.has(dataId))
                    ? _this.registeredStoresByDataId.get(dataId)
                    : immutable_1.Set();
                _this.registeredStoresByDataId =
                    _this.registeredStoresByDataId.set(dataId, setOfStoresToNotify.add(param.notifyWhenDataChanges));
            };
            var data = this._state.dataMap.get(param.dataId);
            var allDataIds = [param.dataId];
            if (data) {
                var embedResourcesIds = data.split().map(function (embedResource) { return embedResource.id; });
                allDataIds = _.union(allDataIds, embedResourcesIds);
            }
            allDataIds.forEach(notifyForOneDataId);
            return this;
        }
        catch (e) {
            console.log("Error occurred in datacache registerForDatChange ", e);
        }
    };
    DataCacheImpl.prototype.add = function (data) {
        try {
            var allDatasToAdd = data.split();
            allDatasToAdd.push(data);
            var newMap = allDatasToAdd.reduce(function (map, el) { return map.set(el.id, el); }, this._state.dataMap);
            this._state = this._state.copy({
                dataMap: newMap
            });
            if (this.registeredStoresByDataId.has(data.id))
                this.registeredStoresByDataId.get(data.id).forEach(function (store) {
                    store.onDataChanged(data);
                });
            return this;
        }
        catch (e) {
            console.log("Error occured in datacache add ", e);
        }
    };
    DataCacheImpl.prototype.addAll = function (array) {
        var _this = this;
        array.forEach(function (resource) { return _this.add(resource); });
        return this;
    };
    DataCacheImpl.prototype.getData = function (param) {
        this.registerForDataChanges(param);
        return this.getDataOption(param).value;
    };
    DataCacheImpl.prototype.getDataFuture = function (param) {
        this.registerForDataChanges(param);
        var dataOption = this.getDataOption(param);
        if (dataOption.isEmpty())
            return param.ifDataMiss();
        else
            return utilitaire_2.Future.successful(dataOption.value);
    };
    DataCacheImpl.prototype.getDataOption = function (param) {
        var _this = this;
        this.registerForDataChanges(param);
        var data = this._state.dataMap.get(param.dataId);
        if (!data)
            return utilitaire_1.Option.empty();
        var result = data.merge(data.split().map(function (embedResource) { return _this._state.dataMap.get(embedResource.id); }));
        return utilitaire_1.Option.of(result);
    };
    return DataCacheImpl;
}());
exports.DataCacheImpl = DataCacheImpl;
exports.DataCache = new DataCacheImpl(DataState_1.DataState.getInitialState());
//# sourceMappingURL=DataCache.js.map