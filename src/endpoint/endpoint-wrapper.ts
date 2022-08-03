import {EndpointConfig} from "./endpoint-config";
import {EndpointOption, EndpointWrapperLike} from "./index-types";
import {AxiosResponse} from "axios";
import {HttpMethod, leyyo} from "@leyyo/core";
import {ControllerWrapperLike} from "../controller";
import {CallOption, CallWrapper} from "../call";
import {StatisticsWrapper} from "../statistics";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class EndpointWrapper extends EndpointConfig implements EndpointWrapperLike {
    protected readonly _controller: ControllerWrapperLike;
    // region specials
    protected _method: HttpMethod;
    protected _path: string;
    protected _operationId: string;
    // endregion specials


    constructor(controller: ControllerWrapperLike, opt: EndpointOption) {
        opt = leyyo.primitive.object(opt) ?? {} as EndpointOption;
        super(opt);
        this._controller = controller;
        this._statistics = new StatisticsWrapper();

        // region specials
        if (opt.method !== undefined) {
            this.method(opt.method);
        }
        if (opt.path !== undefined) {
            this.path(opt.path);
        }
        if (opt.operationId !== undefined) {
            this.operationId(opt.operationId);
        }
        // endregion specials
    }

    // region controller
    get controller(): ControllerWrapperLike {
        return this._controller;
    }
    // endregion controller

    // region specials
    // region method
    get getMethod(): HttpMethod {
        return this._method;
    }
    protected _setPath(path: string): this {
        if (path !== undefined) {
            this._path = leyyo.primitive.text(path);
        }
        return this;
    }
    method(method: HttpMethod, path?: string): this {
        this._method = leyyo.primitive.enumeration(method) ?? HttpMethod.GET;
        return this._setPath(path);
    }
    get(path?: string): this {
        this._method = HttpMethod.GET;
        return this._setPath(path);
    }

    post(path?: string): this {
        this._method = HttpMethod.POST;
        return this._setPath(path);
    }

    put(path?: string): this {
        this._method = HttpMethod.PUT;
        return this._setPath(path);
    }

    patch(path?: string): this {
        this._method = HttpMethod.PATCH;
        return this._setPath(path);
    }

    delete(path?: string): this {
        this._method = HttpMethod.DELETE;
        return this._setPath(path);
    }
    head(path?: string): this {
        this._method = HttpMethod.HEAD;
        return this._setPath(path);
    }
    options(path?: string): this {
        this._method = HttpMethod.OPTIONS;
        return this._setPath(path);
    }
    purge(path?: string): this {
        this._method = HttpMethod.PURGE;
        return this._setPath(path);
    }
    link(path?: string): this {
        this._method = HttpMethod.LINK;
        return this._setPath(path);
    }
    unlink(path?: string): this {
        this._method = HttpMethod.UNLINK;
        return this._setPath(path);
    }
    // endregion method

    // region path
    get getPath(): string {
        return this._path;
    }
    path(path: string): this {
        this._path = leyyo.primitive.text(path);
        return this;
    }
    // endregion path

    // region operationId
    get getOperationId(): string {
        return this._operationId;
    }
    operationId(operationId: string): this {
        this._operationId = leyyo.primitive.text(operationId);
        return this;
    }
    // endregion operationId
    // endregion specials


    // region call
    async run<P = unknown, D = unknown>(opt?: CallOption): Promise<AxiosResponse<P, D>> {
        const call = new CallWrapper(this, opt);
        return call.run();
    }
    async data<P = unknown, D = unknown>(opt?: CallOption): Promise<D> {
        return (await this.run(opt)).data as D;
    }
    // endregion call
}