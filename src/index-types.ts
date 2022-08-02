import {AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders} from "axios";
import {ArraySome, Exception, HttpMethod, RecLike} from "@leyyo/core";

export type RequestBody = ArraySome|RecLike|string|unknown;
export type ResponseData = ArraySome|RecLike|string|unknown;

export type WrapperParamsSerializerLambda = (queries: RecLike) => string;

export type WrapperSuccessResponse<D = ResponseData, B = RequestBody> = AxiosResponse<D, B>;
export type AxiosRequestOptional = unknown;
export interface WrapperErrorResponse<E = Error, D = ResponseData, P = RequestBody> {
    data: D | E;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<P>;
    request?: AxiosRequestOptional;
}

export const PAYLOAD_SEND: Array<HttpMethod> = [HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH];
export type WrapperRequestLambda<P = unknown> = (requestConfig: AxiosRequestConfig<P>) => boolean;
export type WrapperResponseSuccessLambda<P = unknown, D = unknown, D2 = D> = (response: AxiosResponse<P, D>) => AxiosResponse<P, D2>;
export type WrapperResponseErrorLambda<D = ResponseData, B = RequestBody> = (response: WrapperErrorResponse<Error, D, B>) => Exception;
export type WrapperErrorParserLambda<E = Error, P = RequestBody> = (error: Error, config: AxiosRequestConfig<P>) => WrapperErrorResponse<E>;
export type DurationLambda = (duration: number, expected: number, path?: string) => void;

export enum AxiosResponseType {
    ARRAY_BUFFER = 'arraybuffer',
    BLOB = 'blob',
    DOCUMENT = 'document',
    JSON = 'json',
    TEXT = 'text',
    STREAM = 'stream',
}


