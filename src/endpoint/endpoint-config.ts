import {ControllerClear, ControllerConfig} from "../controller";
import {EndpointConfigLike, EndpointOption} from "./index-types";
import {leyyo, RecLike} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";
import {AuthorizationWrapperLike} from "../authorization";
import {AxiosProxyConfig, AxiosRequestHeaders} from "axios";
import {
    WrapperErrorParserLambda, WrapperParamsSerializerLambda,
    WrapperRequestLambda,
    WrapperResponseErrorLambda,
    WrapperResponseSuccessLambda
} from "../index-types";

@Fqn(...FQN_NAME)
export class EndpointConfig<C = ControllerClear> extends ControllerConfig<C> implements EndpointConfigLike<C> {
    // region properties
    protected _description: string;
    protected _fullUrl: string;
    // endregion properties

    constructor(opt: EndpointOption<C>) {
        opt = leyyo.primitive.object(opt) ?? {} as EndpointOption<C>;
        super(opt);
        // region properties
        if (opt.description !== undefined) {
            this.description(opt.description);
        }
        if (opt.fullUrl !== undefined) {
            this.fullUrl(opt.fullUrl);
        }
        // endregion properties
    }

    // region from-endpoint
    // region description
    get getDescription(): string {
        return this._description;
    }

    description(description: string): this {
        this._description = leyyo.primitive.text(description);
        return this;
    }

    // endregion description
    // region fullUrl
    get getFullUrl(): string {
        return this._fullUrl;
    }

    fullUrl(fullUrl: string): this {
        this._fullUrl = leyyo.primitive.text(fullUrl);
        return this;
    }

    // endregion fullUrl
    // endregion from-endpoint

    // region from-controller
    // endregion from-controller

    // region from-server
    // region baseUrl
    get getBaseUrl(): string {
        return this._baseUrl ?? this._overridden('baseUrl') ? undefined : super.getBaseUrl;
    }
    // endregion baseUrl

    // region isForm
    get getIsForm(): boolean {
        return this._isForm ?? this._overridden('isForm') ? undefined : super.getIsForm;
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