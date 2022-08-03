import {AxiosProxyConfig, AxiosRequestHeaders} from "axios";
import {OneOrMore, Primitive, RecLike} from "@leyyo/core";
import {
    WrapperErrorParserLambda,
    WrapperParamsSerializerLambda,
    WrapperRequestLambda,
    WrapperResponseErrorLambda,
    WrapperResponseSuccessLambda
} from "../index-types";
import {ServerOption, ServerWrapperLike} from "../server";
import {StatisticsWrapperLike} from "../statistics";
import {AuthorizationOption} from "../authorization";

export type WrapperClear = 'none';
export interface PoolOption<C = WrapperClear> {
    // region properties
    ttt?: Array<C>;
    baseHeader?: AxiosRequestHeaders;
    baseQuery?: RecLike;
    baseCookie?: RecLike;
    querySerializer?: WrapperParamsSerializerLambda;
    timeout?: number;
    timeoutErrorMessage?: string;
    responseType?: ResponseType;
    maxContentLength?: number;
    maxBodyLength?: number;
    maxRedirects?: number;
    proxy?: AxiosProxyConfig | false;
    decompress?: boolean;
    onRequest?: WrapperRequestLambda;
    onSuccess?: WrapperResponseSuccessLambda;
    onError?: WrapperResponseErrorLambda;
    errorParser?: WrapperErrorParserLambda;
    authorization?: AuthorizationOption;
    defStats?: boolean;
    // endregion properties
    // region specials
    // endregion specials
}

export type PoolExclude = 'zzz';
export type PoolClear = Exclude<keyof PoolOption, PoolExclude>;

export interface PoolConfigLike<C = WrapperClear> {
    // region statistics
    get statistics(): StatisticsWrapperLike;
    // endregion statistics

    // region ttt
    get getTtt(): Array<C>;
    ttt(...fields: Array<C>): this;
    // endregion ttt

    // region authorization
    get getAuthorization(): AuthorizationOption;
    authorization(authorization: AuthorizationOption): this;
    // endregion authorization

    // region baseHeader
    get getBaseHeader(): AxiosRequestHeaders;
    baseHeader(headers: AxiosRequestHeaders): this;
    baseHeader(name: string, value: string): this;
    // endregion baseHeader

    // region baseQuery
    get getBaseQuery(): RecLike;
    baseQuery(queries: RecLike): this;
    baseQuery(name: string, value: OneOrMore<Primitive>): this;
    // endregion baseQuery

    // region baseCookie
    get getBaseCookie(): RecLike;
    baseCookie(queries: RecLike): this;
    baseCookie(name: string, value: string): this;
    // endregion baseCookie

    // region decompress
    get getDecompress(): boolean;
    decompress(enabled?: boolean): this;
    // endregion decompress

    // region defStats
    get getDefStats(): boolean;
    defStats(enabled?: boolean): this;
    // endregion defStats

    // region errorParser
    get getErrorParser(): WrapperErrorParserLambda;
    errorParser(lambda: WrapperErrorParserLambda): this;
    // endregion errorParser

    // region maxBodyLength
    get getMaxContentLength(): number;
    maxContentLength(bytes: number): this;
    // endregion maxBodyLength

    // region maxContentLength
    get getMaxBodyLength(): number;
    maxBodyLength(bytes: number): this;
    // endregion maxContentLength

    // region maxRedirects
    get getMaxRedirects(): number;
    maxRedirects(redirect: number): this;
    // endregion maxRedirects

    // region onError
    get getOnError(): WrapperResponseErrorLambda;
    onError(lambda: WrapperResponseErrorLambda): this;
    // endregion onError

    // region onRequest
    get getOnRequest(): WrapperRequestLambda;
    onRequest(lambda: WrapperRequestLambda): this;
    // endregion onRequest

    // region onSuccess
    get getOnSuccess(): WrapperResponseSuccessLambda;
    onSuccess(lambda: WrapperResponseSuccessLambda): this;
    // endregion onSuccess

    // region proxy
    get getProxy(): AxiosProxyConfig | false;
    proxy(proxy?: AxiosProxyConfig | false): this;
    noProxy(): this;
    // endregion proxy

    // region querySerializer
    get getQuerySerializer(): WrapperParamsSerializerLambda;
    querySerializer(lambda: WrapperParamsSerializerLambda): this;
    // endregion querySerializer

    // region responseType
    get getResponseType(): ResponseType;
    responseType(type: ResponseType): this;
    // endregion responseType

    // region timeout
    get getTimeout(): number;
    timeout(milliseconds: number): this;
    // endregion timeout

    // region timeoutErrorMessage
    get getTimeoutErrorMessage(): string;
    timeoutErrorMessage(message: string): this;
    // endregion timeoutErrorMessage
}

export interface PoolWrapperLike extends PoolConfigLike {
    // region specials
    // endregion specials

    get servers(): Map<string, ServerWrapperLike>;

    addServer(opt: ServerOption): ServerWrapperLike;
    serverByName(name: string, mandatory?: boolean): ServerWrapperLike;
    get serverDefault(): ServerWrapperLike;
}
