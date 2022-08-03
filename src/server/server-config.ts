import {ServerConfigLike, ServerOption} from "./index-types";
import {PoolClear, PoolConfig} from "../pool";
import {AuthorizationWrapperLike} from "../authorization";
import {AxiosProxyConfig, AxiosRequestHeaders} from "axios";
import {leyyo, RecLike} from "@leyyo/core";
import {
    WrapperErrorParserLambda, WrapperParamsSerializerLambda,
    WrapperRequestLambda,
    WrapperResponseErrorLambda,
    WrapperResponseSuccessLambda
} from "../index-types";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class ServerConfig<C = PoolClear> extends PoolConfig<C> implements ServerConfigLike<C> {
    // region properties
    protected _baseUrl: string;
    protected _isForm: boolean;
    // endregion properties

    constructor(opt: ServerOption<C>) {
        opt = leyyo.primitive.object(opt) ?? {} as ServerOption<C>;
        super(opt);
        // region properties
        if (opt.baseUrl !== undefined) {
            this.baseUrl(opt.baseUrl)
        }
        if (opt.isForm !== undefined) {
            this.isForm(opt.isForm)
        }
        // endregion properties
    }

    // region from-server
    // region baseUrl
    get getBaseUrl(): string {
        return this._baseUrl;
    }
    baseUrl(baseUrl: string): this {
        this._baseUrl = leyyo.primitive.text(baseUrl);
        return this;
    }
    // endregion baseUrl

    // region isForm
    get getIsForm(): boolean {
        return this._isForm;
    }

    isForm(isForm?: boolean): this {
        this._isForm = this._defTrue(isForm);
        return undefined;
    }
    // endregion isForm
    // endregion from-server

    // region from-pool
    // region authorization
    get getAuthorization(): AuthorizationWrapperLike {
        return this._authorization ?? this._overridden('authorization') ? undefined : super.getAuthorization;
    }
    // endregion authorization

    // region baseHeader
    get getBaseHeader(): AxiosRequestHeaders {
        return this._baseHeader ?? this._overridden('baseHeader') ? undefined : super.getBaseHeader;
    }
    // endregion baseHeader

    // region baseQuery
    get getBaseQuery(): RecLike {
        return this._baseQuery ?? this._overridden('baseQuery') ? undefined : super.getBaseQuery;
    }
    // endregion baseQuery

    // region decompress
    get getDecompress(): boolean {
        return this._decompress ?? this._overridden('decompress') ? undefined : super.getDecompress;
    }
    // endregion decompress

    // region defStats
    get getDefStats(): boolean {
        return this._defStats ?? this._overridden('defStats') ? undefined : super.getDefStats;
    }
    // endregion defStats

    // region errorParser
    get getErrorParser(): WrapperErrorParserLambda {
        return this._errorParser ?? this._overridden('errorParser') ? undefined : super.getErrorParser;
    }
    // endregion errorParser

    // region maxBodyLength
    get getMaxBodyLength(): number {
        return this._maxBodyLength ?? this._overridden('maxBodyLength') ? undefined : super.getMaxBodyLength;
    }
    // endregion maxBodyLength

    // region maxContentLength
    get getMaxContentLength(): number {
        return this._maxContentLength ?? this._overridden('maxContentLength') ? undefined : super.getMaxContentLength;
    }
    // endregion maxContentLength

    // region maxRedirects
    get getMaxRedirects(): number {
        return this._maxRedirects ?? this._overridden('maxRedirects') ? undefined : super.getMaxRedirects;
    }
    // endregion maxRedirects

    // region onError
    get getOnError(): WrapperResponseErrorLambda {
        return this._onError ?? this._overridden('onError') ? undefined : super.getOnError;
    }
    // endregion onError

    // region onRequest
    get getOnRequest(): WrapperRequestLambda {
        return this._onRequest ?? this._overridden('onRequest') ? undefined : super.getOnRequest;
    }
    // endregion onRequest

    // region onSuccess
    get getOnSuccess(): WrapperResponseSuccessLambda {
        return this._onSuccess ?? this._overridden('onSuccess') ? undefined : super.getOnSuccess;
    }
    // endregion onSuccess

    // region proxy
    get getProxy(): AxiosProxyConfig | false {
        return this._proxy ?? this._overridden('proxy') ? undefined : super.getProxy;
    }
    // endregion proxy

    // region querySerializer
    get getQuerySerializer(): WrapperParamsSerializerLambda {
        return this._querySerializer ?? this._overridden('querySerializer') ? undefined : super.getQuerySerializer;
    }
    // endregion querySerializer

    // region responseType
    get getResponseType(): ResponseType {
        return this._responseType ?? this._overridden('responseType') ? undefined : super.getResponseType;
    }
    // endregion responseType

    // region timeout
    get getTimeout(): number {
        return this._timeout ?? this._overridden('timeout') ? undefined : super.getTimeout;
    }
    // endregion timeout

    // region timeoutErrorMessage
    get getTimeoutErrorMessage(): string {
        return this._timeoutErrorMessage ?? this._overridden('timeoutErrorMessage') ? undefined : super.getTimeoutErrorMessage;
    }
    // endregion timeoutErrorMessage
    // endregion from-pool
}