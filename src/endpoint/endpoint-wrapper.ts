import {EndpointConfig} from "./endpoint-config";
import {EndpointOption, EndpointWrapperLike} from "./index-types";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {HttpMethod, leyyo, RecLike} from "@leyyo/core";
import {PAYLOAD_SEND} from "../index-types";
import {ControllerWrapperLike} from "../controller";
import {CallOption} from "../call";
import * as qs from "qs";
import {StatisticsWrapper} from "../statistics";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class EndpointWrapper extends EndpointConfig implements EndpointWrapperLike {
    protected readonly _controller: ControllerWrapperLike;
    protected _method: HttpMethod;
    protected _path: string;
    protected _operationId: string;

    private _parseMustache(str: string, obj: RecLike): string {
        return str.replace(/{\s*([\w.]+)\s*}/g, (tag: string, match: string): string => {
            const nodes = match.split(".");
            let current = {...obj} as RecLike;
            const length = nodes.length;
            let i = 0;
            while (i < length) {
                try {
                    current = current[nodes[i]] as RecLike;
                } catch (e) {
                    return "";
                }
                i++;
            }
            return current as unknown as string;
        });
    }

    constructor(controller: ControllerWrapperLike, opt: EndpointOption) {
        opt = leyyo.primitive.object(opt) ?? {} as EndpointOption;
        super(opt);
        this._controller = controller;
        this._statistics = new StatisticsWrapper();

        if (opt.method !== undefined) {
            this.method(opt.method);
        }
        if (opt.path !== undefined) {
            this.path(opt.path);
        }
        if (opt.operationId !== undefined) {
            this.operationId(opt.operationId);
        }
    }

    // region controller
    get controller(): ControllerWrapperLike {
        return this._controller;
    }
    // endregion controller

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


    // region call
    async run<P = unknown, D = unknown>(opt?: CallOption): Promise<AxiosResponse<P, D>> {
        opt = leyyo.primitive.object(opt) ?? {} as CallOption;
        const config: AxiosRequestConfig<P> = {
            baseURL: this.getBaseUrl,
            headers: this.getBaseHeader ?? {},
            params: this.getBaseHeader ?? {},
            paramsSerializer: this.getQuerySerializer,
            timeout: this.getTimeout,
            timeoutErrorMessage: this.getTimeoutErrorMessage,
            // responseType: this.getResponseType, // todo
            maxContentLength: this.getMaxContentLength,
            maxBodyLength: this.getMaxBodyLength,
            maxRedirects: this.getMaxRedirects,
            proxy: this.getProxy,
            decompress: this.getDecompress,
            url: this.getFullUrl ?? (this.getBaseUrl + (this.controller.getFolder ?? '')) + (this.getPath ?? ''),
            method: this.getMethod,
            data: opt.payload as P,
        };
        if (config.url && leyyo.is.object(opt.paths, true)) {
            config.url = this._parseMustache(config.url, opt.paths);
        }
        if (this.getIsForm && leyyo.is.object(config.data, true)) {
            config.data = qs.stringify(config.data);
        }
        if (!PAYLOAD_SEND.includes(this.getMethod)) {
            if (config?.data) {
                delete config.data;
            }
        }
        if (this.getOnRequest) {
            try {
                this.getOnRequest(config);
            } catch (e) {
            }
        }
        try {
            const response = await axios.request<P, D>(config) as AxiosResponse<P, D>;
            if (this.getOnSuccess) {
                try {
                    return this.getOnSuccess(response) as AxiosResponse<P, D>;
                } catch (e) {
                }
            }
            return response;
        } catch (e) {
            let err = e;
            const response = this.getErrorParser(e, config);
            if (this.getOnError) {
                try {
                    err = this.getOnError(response);
                } catch (e) {
                }
            }
            throw err;
        }
    }
    async data<P = unknown, D = unknown>(opt?: CallOption): Promise<D> {
        return (await this.run(opt)).data as D;
    }
    // endregion call
}