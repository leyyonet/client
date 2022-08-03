// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

import {AxiosProxyConfig, AxiosRequestConfig, Method, ResponseType} from "axios";
import {ClassLike, DeveloperException, FuncLike, HttpMethod, RecLike} from "@leyyo/core";
import {fqn} from "@leyyo/fqn";
import {DecoIdLike, reflectPool} from "@leyyo/reflection";
import {floatType, funcType, intType, objectType, scalar, textType} from "@leyyo/scalar";
import {
    AxiosResponseType,
    DurationLambda,
    RequestBody,
    WrapperErrorParserLambda,
    WrapperParamsSerializerLambda,
    WrapperRequestLambda,
    WrapperResponseErrorLambda,
    WrapperResponseSuccessLambda,
    WrapperSuccessResponse
} from "./index-types";
import {typeFormat} from "@leyyo/type-format";

// region Query
interface _Parameter extends RecLike {
    name: string;
    pipes?: Array<ClassLike>;
}
export function Query(name: string, ...pipes: Array<ClassLike>): ParameterDecorator {
    const id = reflectPool.identify<_Parameter>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey, index)});
        id.fork(target, propertyKey, index).set({name, pipes});
    });
}
fqn.func(Query);
// endregion Query
// region Param
export function Param(name: string, ...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.identify<_Parameter>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey, index)});
        id.fork(target, propertyKey, index).set({name, pipes});
    });
}
fqn.func(Param);
// endregion Param
// region Header
export function Header(name: string, ...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.identify<_Parameter>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey, index)});
        id.fork(target, propertyKey, index).set({name, pipes});
    });
}
fqn.func(Header);
// endregion Header
// region Cookie
export function Cookie(name: string, ...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.identify<_Parameter>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey, index)});
        id.fork(target, propertyKey, index).set({name, pipes});
    });
}
fqn.func(Cookie);
// endregion Cookie
// region File
export function File(name: string, ...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.identify<_Parameter>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey, index)});
        id.fork(target, propertyKey, index).set({name, pipes});
    });
}
fqn.func(File);
// endregion File
// region Body
interface _Body extends RecLike {
    pipes?: Array<ClassLike>;
}
export function Body(...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.identify<_Body>(this, {parameter: true, notMultiple: true});
    return ((target, propertyKey, index) => {
        id.fork(target, propertyKey, index).set({pipes});
    });
}
fqn.func(Body);
// endregion Body
// region Payload
export function Payload(...pipes: Array<unknown>): ParameterDecorator {
    const id = reflectPool.alias<_Body>(this, Body);
    return ((target, propertyKey, index) => {
        id.fork(target, propertyKey, index).set({pipes});
    });
}
fqn.func(Payload);
// endregion Payload
// region NoAuthentication
export function NoAuthentication(): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        id.fork(target, propertyKey).set({value: true});
    });
}
// endregion NoAuthentication

// region UseAuthentication
interface _UseAuthentication extends RecLike {
    name?: string;
    lambda?: FuncLike
    status?: number;
}
export function UseAuthentication(name: string, status?: number): ClassDecorator|MethodDecorator;
export function UseAuthentication(lambda: FuncLike, status?: number): ClassDecorator|MethodDecorator;
export function UseAuthentication(p1: string|FuncLike, p2?: number): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<_UseAuthentication>(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        p2 = intType.cast(p2, {required: true, field: id.usageName('status', target, propertyKey), def: 401, value: {min: 400, max: 999}});
        const opt: _UseAuthentication = {status: p2};
        if (funcType.is(p1)) {
            opt.lambda = p1 as FuncLike;
        } else {
            opt.name = textType.cast(p1, {required: true, field: id.usageName('name', target, propertyKey)});
        }
        id.fork(target, propertyKey).set(opt);
    });
}
// endregion UseAuthentication
// region ToValue
type ToValuePrimitive = string|boolean|number;
interface _ToValue extends RecLike {
    name: string;
    lambda?: FuncLike
    value?: ToValuePrimitive;
}
interface ToValueOpt extends RecLike {
    name: string;
    fn?: FuncLike
    value?: ToValuePrimitive;
}
function _toValueItem(id: DecoIdLike<ToValueOpt>, p1: unknown, p2: unknown, index: number, target: unknown, propertyKey: PropertyKey): ToValueOpt {
    const indexName = (index > -1) ? `[${index}]` : '';
    const opt: ToValueOpt = {
        name: textType.cast(p1, {required: true, field: id.usageName('name', target, propertyKey, index)}),
    };
    switch (typeof p2) {
        case "number":
            opt.value = floatType.cast(p2, {required: true, field: id.usageName('value', target, propertyKey) + indexName});
            break;
        case "boolean":
            opt.value = p2;
            break;
        case "function":
            opt.fn = p2 as FuncLike;
            break;
        default:
            opt.value = textType.cast(p2, {required: true, field: id.usageName('value', target, propertyKey) + indexName});
            break;
    }
    return opt;
}
function _organizeToValue(id: DecoIdLike<ToValueOpt>, target: unknown, propertyKey: PropertyKey, p1: string|ToValueOpt, p2?: ToValuePrimitive|FuncLike|ToValueOpt, ...values: Array<ToValueOpt>): Array<ToValueOpt> {
    const all: Array<ToValueOpt> = [];
    if (typeof p1 === 'string') {
        all.push(_toValueItem(id, p1, p2, -1, target, propertyKey));
    }
    else {
        values.unshift(p1 as ToValueOpt, p2 as ToValueOpt);
        let i = 0
        for (const item of values) {
            if (item) {
                all.push(_toValueItem(id, item.name, item.fn ?? item.value, i, target, propertyKey));
            }
            i++;
        }
    }
    return all;
}
// endregion ToValue
// region ToParam
export function ToParam(name: string, value: ToValuePrimitive): ClassDecorator|MethodDecorator;
export function ToParam(name: string, fn: FuncLike): ClassDecorator|MethodDecorator;
export function ToParam(...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator;
export function ToParam(p1: string|ToValueOpt, p2?: ToValuePrimitive|FuncLike|ToValueOpt, ...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<ToValueOpt>(this, {clazz: true, method: true});
    return ((target, propertyKey?) => {
        id.fork(target, propertyKey).set(..._organizeToValue(id, target, propertyKey, p1, p2, ...values));
    });
}
// endregion ToParam
// region ToQuery
export function ToQuery(name: string, value: ToValuePrimitive): ClassDecorator|MethodDecorator;
export function ToQuery(name: string, fn: FuncLike): ClassDecorator|MethodDecorator;
export function ToQuery(...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator;
export function ToQuery(p1: string|ToValueOpt, p2?: ToValuePrimitive|FuncLike|ToValueOpt, ...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<ToValueOpt>(this, {clazz: true, method: true});
    return ((target, propertyKey?) => {
        id.fork(target, propertyKey).set(..._organizeToValue(id, target, propertyKey, p1, p2, ...values));
    });
}
// endregion ToQuery
// region ToHeader
export function ToHeader(name: string, value: ToValuePrimitive): ClassDecorator|MethodDecorator;
export function ToHeader(name: string, fn: FuncLike): ClassDecorator|MethodDecorator;
export function ToHeader(...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator;
export function ToHeader(p1: string|ToValueOpt, p2?: ToValuePrimitive|FuncLike|ToValueOpt, ...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<ToValueOpt>(this, {clazz: true, method: true});
    return ((target, propertyKey?) => {
        id.fork(target, propertyKey).set(..._organizeToValue(id, target, propertyKey, p1, p2, ...values));
    });
}
// endregion ToHeader
// region ToCookie
export function ToCookie(name: string, value: ToValuePrimitive): ClassDecorator|MethodDecorator;
export function ToCookie(name: string, fn: FuncLike): ClassDecorator|MethodDecorator;
export function ToCookie(...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator;
export function ToCookie(p1: string|ToValueOpt, p2?: ToValuePrimitive|FuncLike|ToValueOpt, ...values: Array<ToValueOpt>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<ToValueOpt>(this, {clazz: true, method: true});
    return ((target, propertyKey?) => {
        id.fork(target, propertyKey).set(..._organizeToValue(id, target, propertyKey, p1, p2, ...values));
    });
}
// endregion ToCookie
// region Consumes
export function Consumes(...mimeTypes: Array<string>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        mimeTypes = textType.castArrayOf(mimeTypes, {field: id.usageName('mimeTypes', target, propertyKey), items: {min:1}});
        id.fork(target, propertyKey).set({mimeTypes});
    });
}
// endregion Consumes
// region Produces
export function Produces(...mimeTypes: Array<string>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        mimeTypes = textType.castArrayOf(mimeTypes, {field: id.usageName('mimeTypes', target, propertyKey), items: {min:1}});
        id.fork(target, propertyKey).set({mimeTypes});
    });
}
// endregion Produces
// region QuerySerializer
export function QuerySerializer(fn: WrapperParamsSerializerLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {single: 'fn', clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        fn = funcType.cast<WrapperParamsSerializerLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        id.fork(target, propertyKey).set({fn});
    });
}
// endregion QuerySerializer
// region BodySerializer
export function BodySerializer(fn: WrapperParamsSerializerLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {single: 'fn', clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey?) => {
        fn = funcType.cast<WrapperParamsSerializerLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        id.fork(target, propertyKey).set({fn});
    });
}
// endregion BodySerializer
// region Timeout
export function Timeout(msec: number): ClassDecorator|MethodDecorator;
export function Timeout(msec: number, message: string): ClassDecorator|MethodDecorator;
export function Timeout(msec: number, clazz: ClassLike): ClassDecorator|MethodDecorator;
export function Timeout(msec: number, classDef?: string|ClassLike): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        msec = intType.cast(msec, {required: true, value: {min: 1}, field: id.usageName('msec', target, propertyKey)});
        classDef = typeFormat.clazz.cast(classDef, {required: false, field: id.usageName('clazz', target, propertyKey)});
        id.fork(target, propertyKey).set({msec, message: classDef});
    });
}
// endregion Timeout
// region Retry
// retry by http status, exception name or function
export interface RetryOpt extends RecLike {
    times: number;
    status?: number;
    fn?: FuncLike;
}
function _retryItem(id: DecoIdLike<RetryOpt>, p1: unknown, p2: unknown, index: number, target: unknown, propertyKey: PropertyKey): RetryOpt {
    const opt: RetryOpt = {
        times: intType.cast(p1, {required: true, value: {min: 0, max: 100}, field: id.usageName('times', target, propertyKey, index)})
    };
    switch (typeof p2) {
        case "function":
            opt.fn = p2 as FuncLike;
            break;
        default:
            opt.status = intType.cast(p2, {required: true, value: {min: 400, max: 999}, field: id.usageName('status', target, propertyKey, index)});
            break;
    }
    return opt;
}
export function Retry(times: number): ClassDecorator|MethodDecorator;
export function Retry(times: number, status: number): ClassDecorator|MethodDecorator;
export function Retry(times: number, condition: FuncLike): ClassDecorator|MethodDecorator;
export function Retry(...opt: Array<RetryOpt>): ClassDecorator|MethodDecorator;
export function Retry(p1: number|RetryOpt, p2?: FuncLike|number|RetryOpt, ...others: Array<RetryOpt>): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify<RetryOpt>(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        const all: Array<RetryOpt> = [];
        if (typeof p1 === 'number') {
            all.push(_retryItem(id, p1, p2, -1, target, propertyKey));
        }
        else {
            others.unshift(p1 as RetryOpt, p2 as RetryOpt);
            let i = 0
            for (const item of others) {
                if (item) {
                    all.push(_retryItem(id, item.times, item.fn ?? item.status, i, target, propertyKey));
                }
                i++;
            }
        }
        id.fork(target, propertyKey).set(...all);
    });
}
// endregion Retry
// region BaseUrl
function BaseUrl(url: string): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        url = typeFormat.url.cast(url, {required: true, field: id.usageName('url', target, propertyKey)});
        id.fork(target, propertyKey).set({url});
    });
}
// endregion BaseUrl
// region MaxContentLength
function MaxContentLength(bytes: number): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        bytes = intType.cast(bytes, {required: true, value: {min: 1}, field: id.usageName('bytes', target, propertyKey)});
        id.fork(target, propertyKey).set({bytes});
    });
}
// endregion MaxContentLength
// region MaxBodyLength
function MaxBodyLength(bytes: number): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        bytes = intType.cast(bytes, {required: true, value: {min: 1}, field: id.usageName('bytes', target, propertyKey)});
        id.fork(target, propertyKey).set({bytes});
    });
}
// endregion MaxBodyLength
// region MaxRedirects
function MaxRedirects(times: number): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        times = intType.cast(times, {required: true, value: {min: 1}, field: id.usageName('times', target, propertyKey)});
        id.fork(target, propertyKey).set({times});
    });
}
// endregion MaxRedirects
// region Proxy
function Proxy(setting: AxiosProxyConfig|false = false): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        if (setting !== false) {
            setting = objectType.cast(setting, {items: {min: 1}, field: id.usageName('setting', target, propertyKey)}) as unknown as AxiosProxyConfig;
            setting.host = typeFormat.host.cast(setting.host, {required: true, field: id.usageName('setting.host', target, propertyKey)});
            setting.port = intType.cast(setting.port, {required: true, value: {min: 1}, field: id.usageName('setting.port', target, propertyKey)});
            if (setting.auth != undefined) {
                setting.auth = objectType.cast(setting, {items: {min: 2}, field: id.usageName('setting.auth', target, propertyKey)}) as unknown as { username: string, password: string};
                setting.auth.username = textType.cast(setting.auth.username, {required: true, field: id.usageName('setting.auth.username', target, propertyKey)});
                setting.auth.password = textType.cast(setting.auth.password, {field: id.usageName('setting.auth.password', target, propertyKey)});
            }
            if (setting.protocol != undefined) {
                setting.protocol = textType.cast(setting.protocol, {required: true, field: id.usageName('setting.protocol', target, propertyKey)});
            }
        }
        id.fork(target, propertyKey).set({setting});
    });
}
// endregion Proxy
// region Decompress
function Decompress(): ClassDecorator|MethodDecorator;
function Decompress(enabled = true): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        enabled = scalar.toBoolean(enabled, {required: true, field: id.usageName('enabled', target, propertyKey)});
        id.fork(target, propertyKey).set({enabled});
    });
}
// endregion Decompress
// region OnRequest
function OnRequest(fn: WrapperRequestLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        fn = funcType.cast<WrapperRequestLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        id.fork(target, propertyKey).set({fn});
    });
}
// endregion OnRequest
// region OnSuccess
export function OnSuccess(fn: WrapperResponseSuccessLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        fn = funcType.cast<WrapperResponseSuccessLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        id.fork(target, propertyKey).set({fn});
    });
}
// endregion OnSuccess
// region OnError
export function OnError(fn: WrapperResponseErrorLambda): ClassDecorator|MethodDecorator;
export function OnError(fn: WrapperResponseErrorLambda, silent = false): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        fn = funcType.cast<WrapperResponseErrorLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        silent = scalar.toBoolean(silent, {field: id.usageName('silent', target, propertyKey)});
        id.fork(target, propertyKey).set({fn, silent});
    });
}
// endregion OnError
// region ErrorParser
export function ErrorParser(fn: WrapperErrorParserLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        fn = funcType.cast<WrapperErrorParserLambda>(fn, {required: true, param: {min: 1}, field: id.usageName('fn', target, propertyKey)});
        id.fork(target, propertyKey).set({fn});
    });
}
// endregion ErrorParser
// region FormData
export function FormData(): ClassDecorator|MethodDecorator;
export function FormData(enabled = true): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        enabled = scalar.toBoolean(enabled, {required: true, field: id.usageName('enabled', target, propertyKey)});
        id.fork(target, propertyKey).set({enabled});
    });
}
// endregion FormData
// region Duration
interface _Duration extends RecLike {
    expected: number;
    fn: DurationLambda;
}
function Duration(expected: number, fn: DurationLambda): ClassDecorator|MethodDecorator;
function Duration(expectedMap: Record<number, DurationLambda>): ClassDecorator|MethodDecorator;
function Duration(p1: number|Record<number, DurationLambda>, p2?: DurationLambda): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        const all = [] as Array<_Duration>;
        let opt: _Duration;
        switch (typeof p1) {
            case "number":
                opt = {
                    expected: intType.cast(p1, {required: true, value: {min: 1}, field: id.usageName('expected', target, propertyKey)}),
                    fn: funcType.cast<DurationLambda>(p2, {required: true, param: {min: 2}, field: id.usageName('fn', target, propertyKey)}) as DurationLambda,
                }
                all.push(opt);
                break;
            default:
                const map = objectType.cast(p1, {items: {min: 1}, field: id.usageName('expectedMap', target, propertyKey)}) as unknown as Record<number, DurationLambda>;
                for (const [expected, fn] of Object.entries(map)) {
                    opt = {
                        expected: intType.cast(expected, {required: true, value: {min: 1}, field: id.usageName('expected', target, propertyKey) + `[${all.length}]`}),
                        fn: funcType.cast<DurationLambda>(fn, {required: true, param: {min: 2}, field: id.usageName('fn', target, propertyKey) + `[${all.length}]`}) as DurationLambda,
                    }
                    all.push(opt);
                }
                break;
        }
        if (all.length > 0) {
            const forked = id.fork(target, propertyKey);
            all.forEach(item => forked.set(item));
        }
        // todo
    });
}
// endregion Duration
// region ResponseType
function ResponseType(type: AxiosResponseType|ResponseType): ClassDecorator|MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey) => {
        type = scalar.toEnum<AxiosResponseType>(type, {required: true, map: AxiosResponseType, field: id.usageName('type', target, propertyKey)});
        id.fork(target, propertyKey).set({type});
    });
}
// endregion ResponseType
// region Operation
interface _Operation {
    path?: string;
    summary?: string;
}
function Operation(method: HttpMethod|Method): MethodDecorator;
function Operation(method: HttpMethod|Method, path: string): MethodDecorator;
function Operation(method: HttpMethod|Method, options: _Operation): MethodDecorator;
function Operation(method: HttpMethod|Method, p2?: string|_Operation): MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true, method: true, notMultiple: true});
    return ((target, propertyKey, descriptor) => {
        method = scalar.toEnum<HttpMethod>(method, {required: true, def: HttpMethod.GET, map: HttpMethod, field: id.usageName('method', target, propertyKey)});
        let path: string = null;
        let summary: string = null;
        if (p2 !== undefined) {
            if (typeof p2 === 'string') {
                path = textType.cast(p2, {field: id.usageName('path', target, propertyKey)});
            } else {
                const obj = objectType.cast(p2, {field: id.usageName('options', target, propertyKey)}) as _Operation;
                path = textType.cast(obj.path, {field: id.usageName('options.path', target, propertyKey)});
                summary = textType.cast(obj.summary, {field: id.usageName('options.summary', target, propertyKey)});
            }
        }
        id.fork(target, propertyKey).set({method, path, summary});
    });
}
// endregion Operation
// region Get
function Get(): ClassDecorator|MethodDecorator;
function Get(path: string): ClassDecorator|MethodDecorator;
function Get(options: _Operation): ClassDecorator|MethodDecorator;
function Get(value?: string|_Operation): ClassDecorator|MethodDecorator {
    return Operation(HttpMethod.GET, value as _Operation);
}
// endregion Get
// region Duration
function Post(): ClassDecorator|MethodDecorator;
function Post(path: string): ClassDecorator|MethodDecorator;
function Post(options: _Operation): ClassDecorator|MethodDecorator;
function Post(value?: string|_Operation): ClassDecorator|MethodDecorator {
    return Operation(HttpMethod.POST, value as _Operation);
}
// endregion Post
// region Delete
function Delete(): ClassDecorator|MethodDecorator;
function Delete(path: string): ClassDecorator|MethodDecorator;
function Delete(options: _Operation): ClassDecorator|MethodDecorator;
function Delete(value?: string|_Operation): ClassDecorator|MethodDecorator {
    return Operation(HttpMethod.DELETE, value as _Operation);
}
// endregion Delete
// region Put
function Put(): ClassDecorator|MethodDecorator;
function Put(path: string): ClassDecorator|MethodDecorator;
function Put(options: _Operation): ClassDecorator|MethodDecorator;
function Put(value?: string|_Operation): ClassDecorator|MethodDecorator {
    return Operation(HttpMethod.PUT, value as _Operation);
}
// endregion Put
// region Patch
function Patch(): ClassDecorator|MethodDecorator;
function Patch(path: string): ClassDecorator|MethodDecorator;
function Patch(options: _Operation): ClassDecorator|MethodDecorator;
function Patch(value?: string|_Operation): ClassDecorator|MethodDecorator {
    return Operation(HttpMethod.PATCH, value as _Operation);
}
// endregion Patch

// region Authenticator
export type AuthenticatorParserLambda = (response: WrapperSuccessResponse) => RecLike;
export type AuthenticatorLocatorLambda = (data: RecLike, request: AxiosRequestConfig<RequestBody>) => RecLike;
interface AuthenticatorItem {
    parser: AuthenticatorParserLambda;
    locator: AuthenticatorLocatorLambda;
    data: RecLike;
    errorCount: number;
    generateCount: number;
    path: string;
}
const authenticatorRepo = {} as RecLike<AuthenticatorItem>;
function Authenticator(name: string, parser: AuthenticatorParserLambda, locator: AuthenticatorLocatorLambda): MethodDecorator {
    const id = reflectPool.identify(this, {clazz: true});
    return ((target, propertyKey) => {
        name = textType.cast(name, {required: true, field: id.usageName('name', target, propertyKey)});
        if (authenticatorRepo[name] !== undefined) {
            throw new DeveloperException('duplicated.authenticator.name', {name, path: authenticatorRepo[name].path});
        }
        parser = funcType.cast<AuthenticatorParserLambda>(parser, {required: true, param: {min:1}, field: id.usageName('parser', target, propertyKey)});
        locator = funcType.cast<AuthenticatorLocatorLambda>(locator, {required: true, param: {min: 2}, field: id.usageName('locator', target, propertyKey)});
        authenticatorRepo[name] = {
            parser, locator, data: null, errorCount: 0, generateCount: 0,
            path: id.usageName('name', target, propertyKey),
        };
    });
}
// endregion Authenticator


/*
* const FormData = require('form-data'); // npm install --save form-data

const form = new FormData();
*
form.append('file', (file instance of fs.ReadStream>): file: fs.createReadStream(file as string));

const request_config = {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    ...form.getHeaders()
  }
};

return axios.post(url, form, request_config);
*
* form.getHeaders() returns an Object with the content-type as well as the boundary.
For example:

{ "content-type": "multipart/form-data; boundary=-------------------0123456789" }
* */