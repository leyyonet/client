import {RecLike} from "@leyyo/core";
import {EndpointWrapperLike} from "../endpoint";
import {Stream} from "stream";
import {AxiosResponse} from "axios";

export interface CallFileItem {
    data: Buffer | Stream | Blob;
    name: string;
}
export interface CallOption {
    param?: RecLike;
    query?: RecLike;
    header?: RecLike;
    cookie?: RecLike;
    file?: RecLike<CallFileItem>;
    payload?: unknown;
}
export interface CallWrapperLike {
    get endpoint(): EndpointWrapperLike;
    run<P = unknown, D = unknown>(): Promise<AxiosResponse<P, D>>;
    get tryCount(): number;
}