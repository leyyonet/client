import {ControllerConfig} from "./controller-config";
import {ControllerOption, ControllerWrapperLike} from "./index-types";
import {ServerWrapperLike} from "../server";
import {EndpointOption, EndpointWrapper, EndpointWrapperLike} from "../endpoint";
import {DeveloperException, HttpMethod, leyyo} from "@leyyo/core";
import {StatisticsWrapper} from "../statistics";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class ControllerWrapper extends ControllerConfig implements ControllerWrapperLike {
    protected readonly _server: ServerWrapperLike;
    protected readonly _endpoints: Array<EndpointWrapperLike>;
    protected _folder: string;
    protected _identifier: string;

    constructor(server: ServerWrapperLike, opt: ControllerOption) {
        opt = leyyo.primitive.object(opt) ?? {} as ControllerOption;
        super(opt);
        if (opt.folder !== undefined) {
            this.folder(opt.folder);
        }
        if (opt.identifier !== undefined) {
            this.identifier(opt.identifier);
        }
        this._server = server;
        this._endpoints = [];
        this._statistics = new StatisticsWrapper(() => this._endpoints.map( endpoint => endpoint.statistics));
    }
    // region server
    get server(): ServerWrapperLike {
        return this._server;
    }
    // endregion server

    // region folder
    get getFolder(): string {
        return this._folder;
    }
    folder(folder?: string): this {
        this._folder = leyyo.primitive.text(folder);
        return this;
    }
    // endregion folder

    // region identifier
    get getIdentifier(): string {
        return this._identifier;
    }
    identifier(identifier?: string): this {
        this._identifier = leyyo.primitive.text(identifier);
        return this;
    }
    // endregion identifier
    // region endpoints
    get endpoints(): Array<EndpointWrapperLike> {
        return this._endpoints;
    }

    addEndpoint(opt: EndpointOption): EndpointWrapperLike {
        const endpoint = new EndpointWrapper(this, opt);
        this._endpoints.push(endpoint);
        return endpoint;
    }

    endpointByFolder(method: HttpMethod, path?: string, mandatory?: boolean): EndpointWrapperLike {
        method = leyyo.primitive.enumeration(method) ?? HttpMethod.GET;
        path = leyyo.primitive.text(path);
        const list = path ? this._endpoints.filter(endpoint => endpoint.getMethod === method && endpoint.getPath === path) : this._endpoints.filter(endpoint => endpoint.getMethod === method && !endpoint.getPath);
        if (list.length > 0) {
            return list[0];
        }
        if (!mandatory) {
            return null;
        }
        throw new DeveloperException('wrapper-server.not.found', {method, path}).with(this);
    }

    endpointByOperationId(operationId: string, mandatory?: boolean): EndpointWrapperLike {
        operationId = leyyo.primitive.text(operationId);
        const list = this._endpoints.filter(endpoint => endpoint.getOperationId === operationId);
        if (list.length > 0) {
            return list[0];
        }
        if (!mandatory) {
            return null;
        }
        throw new DeveloperException('wrapper-server.not.found', {operationId}).with(this);
    }
    // endregion endpoints
}