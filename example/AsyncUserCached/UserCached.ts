
import {HasId, Mergeable, Splittable} from "utilitaire";
export type UserDesc = {
    id : string
    username : string
}
export class User implements HasId<User>, Mergeable<User,any>, Splittable<User, any> {
    constructor(protected desc:UserDesc){}

    get id(): string { return this.desc.id; }
    get username(): string { return this.desc.username; }


    split(): Array<any> {
        return [];
    }
    merge(resources:Array<any>): User {
        return this;
    }
    copy(desc: Partial<UserDesc>): User {
        // @ts-ignore
        return new User(Object.assign({}, this.desc, desc));
    }
}