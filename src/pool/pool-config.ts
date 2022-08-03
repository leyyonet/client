import {PoolConfigLike, PoolOption, WrapperClear} from "./index-types";
import {AxiosProxyConfig, AxiosRequestHeaders} from "axios";
import {leyyo, OneOrMore, Primitive, RecLike} from "@leyyo/core";
import {
    WrapperErrorParserLambda, WrapperParamsSerializerLambda,
    WrapperRequestLambda,
    WrapperResponseErrorLambda,
    WrapperResponseSuccessLambda
} from "../index-types";
import {AuthorizationOption, AuthorizationWrapper, AuthorizationWrapperLike} from "../authorization";
import {StatisticsWrapper, StatisticsWrapperLike} from "../statistics";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export abstract class PoolConfig<C = WrapperClear> implements PoolConfigLike<C> {
    // region properties
    protected _ttt: Array<C>;
    protected _statistics: StatisticsWrapperLike
    protected _authorization: AuthorizationWrapperLike;
    protected _baseHeader?: AxiosRequestHeaders;
    protected _baseQuery?: RecLike;
    protected _baseCookie?: RecLike;
    protected _querySerializer?: WrapperParamsSerializerLambda;
    protected _timeout?: number;
    protected _timeoutErrorMessage?: string;
    protected _responseType?: ResponseType;
    protected _maxContentLength?: number;
    protected _maxBodyLength?: number;
    protected _maxRedirects?: number;
    protected _proxy?: AxiosProxyConfig | false;
    protected _decompress?: boolean;
    protected _defStats?: boolean;
    protected _onRequest?: WrapperRequestLambda;
    protected _onSuccess?: WrapperResponseSuccessLambda;
    protected _onError?: WrapperResponseErrorLambda;
    protected _errorParser?: WrapperErrorParserLambda;
    // endregion properties

    protected constructor(opt: PoolOption<C>) {
        this._ttt = [];
        opt = leyyo.primitive.object(opt) ?? {} as PoolOption<C>;

        // region properties
        if (opt.ttt !== undefined) {
            this.ttt(...opt.ttt);
        }
        if (opt.authorization !== undefined) {
            this.authorization(opt.authorization);
        }
        if (opt.baseHeader !== undefined) {
            this.baseHeader(opt.baseHeader);
        }
        if (opt.baseQuery !== undefined) {
            this.baseQuery(opt.baseQuery);
        }
        if (opt.decompress !== undefined) {
            this.decompress(opt.decompress);
        }
        if (opt.defStats !== undefined) {
            this.defStats(opt.defStats);
        }
        if (opt.errorParser !== undefined) {
            this.errorParser(opt.errorParser);
        }
        if (opt.maxBodyLength !== undefined) {
            this.maxBodyLength(opt.maxBodyLength);
        }
        if (opt.maxContentLength !== undefined) {
            this.maxContentLength(opt.maxContentLength);
        }
        if (opt.maxRedirects !== undefined) {
            this.maxRedirects(opt.maxRedirects);
        }
        if (opt.onError !== undefined) {
            this.onError(opt.onError);
        }
        if (opt.onRequest !== undefined) {
            this.onRequest(opt.onRequest);
        }
        if (opt.onSuccess !== undefined) {
            this.onSuccess(opt.onSuccess);
        }
        if (opt.proxy !== undefined) {
            this.proxy(opt.proxy);
        }
        if (opt.querySerializer !== undefined) {
            this.querySerializer(opt.querySerializer);
        }
        if (opt.responseType !== undefined) {
            this.responseType(opt.responseType);
        }
        if (opt.timeout !== undefined) {
            this.timeout(opt.timeout);
        }
        if (opt.timeoutErrorMessage !== undefined) {
            this.timeoutErrorMessage(opt.timeoutErrorMessage);
        }
        if (opt.decompress !== undefined) {
            this.decompress(opt.decompress);
        }
        // endregion properties
    }

    // region protected
    protected _defTrue(value: boolean): boolean {
        return (value === undefined) ? true : value;
    }
    protected _overridden(key: string): boolean {
        return this._ttt.includes(key as unknown as C);
    }
    // endregion protected

    // region from-pool

    // region statistics
    get statistics(): StatisticsWrapperLike {
        if (!this._statistics) {
            this._statistics = new StatisticsWrapper();
            // todo
        }
        return this._statistics;
    }
    // endregion statistics

    // region ttt
    get getTtt(): Array<C> {
        return this._ttt;
    }

    ttt(...fields: Array<C>): this {
        fields.forEach(field => {
            if (!this._ttt.includes(field)) {
                this._ttt.push(field)
            }
        })
        return this;
    }
    // endregion ttt

    // region authorization
    get getAuthorization(): AuthorizationWrapperLike {
        return this._authorization;
    }
    authorization(authorization: AuthorizationOption): this {
        if (!authorization) {
            this._authorization = null;
        } else {
            this._authorization = new AuthorizationWrapper(authorization);
        }
        return this;
    }
    // endregion authorization

    // region baseHeader
    private _setHeader(key: string, value: string): void {
        this._baseHeader[key] = leyyo.primitive.text(value);
    }
    get getBaseHeader(): AxiosRequestHeaders {
        return this._baseHeader;
    }
    baseHeader(headers: AxiosRequestHeaders): this;
    baseHeader(name: string, value: string): this;
    baseHeader(headers: AxiosRequestHeaders | string, value?: string): this {
        if (!this._baseHeader) {
            this._baseHeader = {};
        }
        if (leyyo.is.object(headers)) {
            for (const [k, v] of Object.entries(headers)) {
                this._setHeader(k, v as string);
            }
        } else if (typeof headers === "string") {
            this._setHeader(headers, value);
        }
        else {
            // todo
        }
        if (Object.keys(this._baseHeader).length < 1) {
            this._baseHeader = null;
        }
        return this;
    }
    // endregion baseHeader

    // region baseQuery
    protected _setQuery(key: string, value: OneOrMore<Primitive>): void {
        this._baseQuery[key] = value;
    }
    get getBaseQuery(): RecLike {
        return this._baseQuery;
    }
    baseQuery(queries: RecLike): this;
    baseQuery(name: string, value: OneOrMore<Primitive>): this;
    baseQuery(queries: RecLike | string, value?: OneOrMore<Primitive>): this {
        if (!this._baseQuery) {
            this._baseQuery = {};
        }
        if (leyyo.is.object(queries)) {
            for (const [k, v] of Object.entries(queries)) {
                this._setQuery(k, v as OneOrMore<Primitive>);
            }
        } else if (typeof queries === "string") {
            this._setQuery(queries, value);
        }
        else {
            // todo
        }
        if (Object.keys(this._baseQuery).length < 1) {
            this._baseQuery = null;
        }
        return this;
    }
    // endregion baseQuery

    // region baseCookie
    protected _setCookie(key: string, value: OneOrMore<Primitive>): void {
        this._baseCookie[key] = value;
    }
    get getBaseCookie(): RecLike {
        return this._baseCookie;
    }
    baseCookie(cookies: RecLike): this;
    baseCookie(name: string, value: string): this;
    baseCookie(cookies: RecLike | string, value?: string): this {
        if (!this._baseCookie) {
            this._baseCookie = {};
        }
        if (leyyo.is.object(cookies)) {
            for (const [k, v] of Object.entries(cookies)) {
                this._setCookie(k, v as string);
            }
        } else if (typeof cookies === "string") {
            this._setCookie(cookies, value);
        }
        else {
            // todo
        }
        if (Object.keys(this._baseCookie).length < 1) {
            this._baseCookie = null;
        }
        return this;
    }
    // endregion baseCookie

    // region decompress
    get getDecompress(): boolean {
        return this._decompress;
    }
    decompress(enabled?: boolean): this {
        this._decompress = this._defTrue(enabled);
        return this;
    }
    // endregion decompress

    // region defStats
    get getDefStats(): boolean {
        return this._defStats;
    }
    defStats(enabled?: boolean): this {
        this._defStats = this._defTrue(enabled);
        return this;
    }
    // endregion defStats

    // region errorParser
    get getErrorParser(): WrapperErrorParserLambda {
        return this._errorParser;
    }
    errorParser(lambda: WrapperErrorParserLambda): this {
        this._errorParser = leyyo.primitive.func(lambda);
        return this;
    }
    // endregion errorParser

    // region maxBodyLength
    get getMaxBodyLength(): number {
        return this._maxBodyLength;
    }
    maxBodyLength(bytes: number): this {
        this._maxBodyLength = leyyo.primitive.integer(bytes);
        return this;
    }
    // endregion maxBodyLength

    // region maxContentLength
    get getMaxContentLength(): number {
        return this._maxContentLength;
    }
    maxContentLength(bytes: number): this {
        this._maxContentLength = leyyo.primitive.integer(bytes);
        return this;
    }
    // endregion maxContentLength

    // region maxRedirects
    get getMaxRedirects(): number {
        return this._maxRedirects;
    }
    maxRedirects(redirect: number): this {
        this._maxRedirects = leyyo.primitive.integer(redirect);
        return this;
    }
    // endregion maxRedirects

    // region onError
    get getOnError(): WrapperResponseErrorLambda {
        return this._onError;
    }
    onError(lambda: WrapperResponseErrorLambda): this {
        this._onError = leyyo.primitive.func(lambda);
        return this;
    }
    // endregion onError

    // region onRequest
    get getOnRequest(): WrapperRequestLambda {
        return this._onRequest;
    }
    onRequest(lambda: WrapperRequestLambda): this {
        this._onRequest = leyyo.primitive.func(lambda);
        return this;
    }
    // endregion onRequest

    // region onSuccess
    get getOnSuccess(): WrapperResponseSuccessLambda {
        return this._onSuccess;
    }
    onSuccess(lambda: WrapperResponseSuccessLambda): this {
        this._onSuccess = leyyo.primitive.func(lambda);
        return this;
    }
    // endregion onSuccess

    // region proxy
    get getProxy(): AxiosProxyConfig | false {
        return this._proxy;
    }
    noProxy(): this {
        this._proxy = null;
        return this;
    }
    proxy(proxy?: AxiosProxyConfig | false): this {
        if (!proxy) {
            return this.noProxy();
        }
        proxy = (leyyo.primitive.object(proxy) ?? {}) as unknown as AxiosProxyConfig;
        proxy.host = leyyo.primitive.text(proxy.host);
        proxy.port = leyyo.primitive.integer(proxy.port);
        proxy.auth = (leyyo.primitive.object(proxy.auth) ?? {username: null, password: null}) as {username: string, password: string};
        if (Object.keys(proxy.auth).length > 0) {
            proxy.auth.username = leyyo.primitive.text(proxy.auth.username);
            proxy.auth.username = leyyo.primitive.text(proxy.auth.password);
        } else if (proxy.auth !== undefined) {
            delete proxy.auth;
        }
        proxy.protocol = leyyo.primitive.text(proxy.protocol);
        this._proxy = proxy;
        return this;
    }
    // endregion proxy

    // region querySerializer
    get getQuerySerializer(): WrapperParamsSerializerLambda {
        return this._querySerializer;
    }
    querySerializer(lambda: WrapperParamsSerializerLambda): this {
        this._querySerializer = leyyo.primitive.func(lambda);
        return this;
    }
    // endregion querySerializer

    // region responseType
    get getResponseType(): ResponseType {
        return this._responseType;
    }
    responseType(type: ResponseType): this {
        const str = leyyo.primitive.text(type);
        if (["basic" , "cors" , "default" , "error" , "opaque" , "opaqueredirect"].includes(str)) {
            this._responseType = str as ResponseType;
        } else {
            this._responseType = null;
        }
        return this;
    }
    // endregion responseType

    // region timeout
    get getTimeout(): number {
        return this._timeout;
    }
    timeout(milliseconds: number): this {
        this._timeout = leyyo.primitive.integer(milliseconds);
        return this;
    }
    // endregion timeout

    // region timeoutErrorMessage
    get getTimeoutErrorMessage(): string {
        return this._timeoutErrorMessage;
    }
    timeoutErrorMessage(message: string): this {
        this._timeoutErrorMessage = leyyo.primitive.text(message);
        return this;
    }
    // endregion timeoutErrorMessage
    // endregion from-pool
}