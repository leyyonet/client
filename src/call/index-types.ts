import {RecLike} from "@leyyo/core";
import {EndpointWrapperLike} from "../endpoint";

export interface CallOption {
    paths?: RecLike;
    query?: RecLike;
    header?: RecLike;
    payload?: unknown;
}
export interface CallWrapperLike {
    getEndpoint(): EndpointWrapperLike;
    run<T>(): Promise<T>;
    get tryCount(): number;
}