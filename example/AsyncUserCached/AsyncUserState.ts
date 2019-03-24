import {Option} from "utilitaire";
import {Future} from "utilitaire";
import {User} from "./UserCached";

export type AsyncUserState = { userOption : Option<Future<User>> };
