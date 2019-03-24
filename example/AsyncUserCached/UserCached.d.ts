import { HasId, Mergeable, Splittable } from "utilitaire";
export declare type UserDesc = {
    id: string;
    username: string;
};
export declare class User implements HasId<User>, Mergeable<User, any>, Splittable<User, any> {
    protected desc: UserDesc;
    constructor(desc: UserDesc);
    readonly id: string;
    readonly username: string;
    split(): Array<any>;
    merge(resources: Array<any>): User;
    copy(desc: Partial<UserDesc>): User;
}
