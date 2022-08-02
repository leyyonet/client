import {AuthorizationGenerator, AuthorizationOption, AuthorizationWrapperLike} from "./index-types";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";
import {leyyo} from "@leyyo/core";

@Fqn(...FQN_NAME)
export class AuthorizationWrapper implements AuthorizationWrapperLike {
    protected _timeout: number;
    protected _maxTry: number;
    protected _generator: AuthorizationGenerator;
    constructor(opt?: AuthorizationOption) {
        opt = leyyo.primitive.object(opt) ?? {} as AuthorizationOption;
        this._timeout = leyyo.primitive.integer(opt.timeout);
        this._maxTry = leyyo.primitive.integer(opt.maxTry);
        this._generator = leyyo.primitive.func(opt.generator);
    }

    get maxTry(): number {
        return this._maxTry;
    }

    get timeout(): number {
        return this._timeout;
    }
    get generator(): AuthorizationGenerator {
        return this._generator;
    }
    async generate(...params: Array<unknown>): Promise<unknown> {
        if (!this._generator) {
            return null;
        }
        return this._generator(params);
    }

}