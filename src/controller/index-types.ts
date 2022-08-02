import {ServerClear, ServerConfigLike, ServerExclude, ServerOption, ServerWrapperLike} from "../server";
import {EndpointOption, EndpointWrapperLike} from "../endpoint";
import {HttpMethod} from "@leyyo/core";

export interface ControllerOption extends ServerOption {
    folder?: string;
    identifier?: string;

    clearServer?: Array<ServerClear>;
}
export type ControllerExclude = ServerExclude | 'folder' | 'identifier' | 'clearServer';
export type ControllerClear = Exclude<keyof ControllerOption, ControllerExclude>;

export interface ControllerConfigLike extends ServerConfigLike {

    // region clearServer
    get getClearServer(): Array<ServerClear>;
    clearServer(...fields: Array<ServerClear>): this;
    // endregion clearServer
}
export interface ControllerWrapperLike extends ControllerConfigLike {
    // region server
    get server(): ServerWrapperLike;
    // endregion server

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