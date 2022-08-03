import {HttpMethod} from "@leyyo/core";
import {ControllerClear, ControllerExclude, ControllerOption, ControllerWrapperLike} from "../controller";
import {ServerConfigLike} from "../server";
import {CallOption} from "../call";
import {AxiosResponse} from "axios";

export interface EndpointOption<C = ControllerClear> extends ControllerOption<C> {
    // region specials
    // endregion specials
    method?: HttpMethod;
    path?: string;
    operationId?: string;

    // region properties
    // endregion properties
    fullUrl?: string;
    description?: string;
}
export type EndpointExclude = ControllerExclude | 'method' | 'path' | 'operationId';
export type EndpointClear = Exclude<keyof EndpointOption, EndpointExclude>;

export interface EndpointConfigLike<C = ControllerClear> extends ServerConfigLike<C> {

    // region description
    get getDescription(): string;
    description(description: string): this;
    // endregion description

    // region fullUrl
    get getFullUrl(): string;
    fullUrl(fullUrl: string): this;
    // endregion fullUrl
}
export interface EndpointWrapperLike extends EndpointConfigLike {
    // region controller
    get controller(): ControllerWrapperLike;
    // endregion controller

    // region specials
    // endregion specials

    // region method
    get getMethod(): HttpMethod;
    method(method: HttpMethod, path?: string): this;
    get(path?: string): this;
    post(path?: string): this;
    put(path?: string): this;
    patch(path?: string): this;
    delete(path?: string): this;
    head(path?: string): this;
    options(path?: string): this;
    purge(path?: string): this;
    link(path?: string): this;
    unlink(path?: string): this;
    // endregion method

    // region path
    get getPath(): string;
    path(path: string): this;
    // endregion path

    // region operationId
    get getOperationId(): string;
    operationId(operationId: string): this;
    // endregion operationId


    // region call
    // endregion call
    run<P = unknown, D = unknown>(opt?: CallOption): Promise<AxiosResponse<P, D>>;
    data<P = unknown, D = unknown>(opt?: CallOption): Promise<D>;
}
