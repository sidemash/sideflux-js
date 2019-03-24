import {Future} from "utilitaire";
import {User} from "./User";

export type AsyncUserState = { userFuture : Future<User> };
