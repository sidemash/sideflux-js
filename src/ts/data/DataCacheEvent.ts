

export abstract class DataCacheEvent {

    constructor(protected _data : any) {}

    get name() : string { return "DataCacheEvent"; }
    isCreated() : boolean { return false; }
    isUpdated() : boolean { return false; }
    isDeleted() : boolean { return false; }

    ifIsCreated<T>(fn: (data: T) => any) : DataCacheEvent {
        if (this.isCreated()) {
            fn(this._data);
        }
        return this;
    }

    ifIsCreatedOrUpdated<T>(fn: (data: T) => any) : DataCacheEvent {
        if (this.isCreated()) {
            fn(this._data);
        }
        else if(this.isUpdated()){
            fn(this._data);
        }
        return this;
    }

    ifIsUpdated<T>(fn: (data: T) => any) : DataCacheEvent {
        if (this.isUpdated()) {
            fn(this._data);
        }
        return this;
    }

    ifIsDeleted<T>(fn: (data: T) => any) : DataCacheEvent {
        if (this.isDeleted()) {
            fn(this._data);
        }
        return this;
    }

    ifIsCreatedAndMatch<T>(predicate: (data : T) => boolean, fn: (data: T) => any) : DataCacheEvent {
        if (this.isCreated() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    }

    ifIsUpdatedAndMatch<T>(predicate: (data : T) => boolean, fn: (data: T) => any): DataCacheEvent {
        if (this.isUpdated() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    }

    ifIsDeletedAndMatch<T>(predicate: (data : T) => boolean, fn: (data: T) => any): DataCacheEvent {
        if (this.isDeleted() && predicate(this._data)) {
            fn(this._data);
        }
        return this;
    }

}
/*
export class DataCacheEventCreated extends DataCacheEvent {

    static name(resourceId): string {
        return `DataCacheEventCreated:${resourceId}`;
    }

    isCreated() : boolean { return true; }
}

export class DataCacheEventUpdated extends DataCacheEvent {

    static name(resourceId): string {
        return `DataCacheEventUpdated:${resourceId}`;
    }

    isUpdated() : boolean { return true; }
}

export class DataCacheEventDeleted extends DataCacheEvent {

    static name(resourceId): string {
        return `DataCacheEventDeleted:${resourceId}`;
    }

    isDeleted() : boolean { return true; }
}
*/