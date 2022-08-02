import {ServerClear, ServerConfig} from "../server";
import {ControllerConfigLike, ControllerOption} from "./index-types";
import {leyyo} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class ControllerConfig extends ServerConfig implements  ControllerConfigLike {
    protected _clearServer: Array<ServerClear>;
    constructor(opt: ControllerOption) {
        opt = leyyo.primitive.object(opt) ?? {} as ControllerOption;
        super(opt);
        if (opt.clearServer !== undefined) {
            this.clearServer(...opt.clearServer);
        }
    }

    // region clearServer
    get getClearServer(): Array<ServerClear> {
        return this._clearServer ?? [];
    }
    clearServer(...fields: Array<ServerClear>): this {
        if (!this._clearServer) {
            this._clearServer = [];
        }
        fields.forEach(field => {
            if (!this._clearServer.includes(field)) {
                this._clearServer.push(field)
            }
        })
        return this;
    }
    // endregion clearServer
}