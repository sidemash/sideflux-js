import { ContainerComponent } from "../../src/ts/ContainerComponent";
import { AsyncUserState } from "./AsyncUserState";
export declare type AsyncUserProps = {
    userId: string;
};
export declare class AsyncUser extends ContainerComponent<AsyncUserProps, AsyncUserState> {
    constructor(props: AsyncUserProps);
    refresh(): void;
    render(): JSX.Element;
}
