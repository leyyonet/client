import {ServerClear, ServerConfigLike, ServerExclude, ServerOption, ServerWrapperLike} from "../server";
import {EndpointOption, EndpointWrapperLike} from "../endpoint";
import {HttpMethod} from "@leyyo/core";

export interface ControllerOption<C = ServerClear> extends ServerOption<C> {
    // region properties
    // endregion properties
    // region specials
    // endregion specials
    folder?: string;
    identifier?: string;
}
export type ControllerExclude = ServerExclude | 'folder' | 'identifier';
export type ControllerClear = Exclude<keyof ControllerOption, ControllerExclude>;

export interface ControllerConfigLike<C = ServerClear> extends ServerConfigLike<C> {
    // region properties
    none(): this;
    // endregion properties
}
export interface ControllerWrapperLike extends ControllerConfigLike {
    // region server
    get server(): ServerWrapperLike;
    // endregion server

    // region specials
    // endregion specials
    // region folder
    get getFolder(): string;
    folder(folder?: string): this;
    // endregion folder

    // region identifier
    get getIdentifier(): string;
    identifier(identifier?: string): this;
    // endregion identifier

    // region endpoints
    get endpoints(): Array<EndpointWrapperLike>;
    addEndpoint(opt: EndpointOption): EndpointWrapperLike;
    endpointByFolder(method: HttpMethod, path?: string, mandatory?: boolean): EndpointWrapperLike;
    endpointByOperationId(operationId: string, mandatory?: boolean): EndpointWrapperLike;
    // endregion endpoints
}