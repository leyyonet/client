import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";
import {PoolWrapperLike} from "../pool";
import {ServerOption, ServerWrapperLike} from "./index-types";
import {ServerConfig} from "./server-config";
import {ControllerOption, ControllerWrapper, ControllerWrapperLike} from "../controller";
import {DeveloperException, leyyo} from "@leyyo/core";
import {StatisticsWrapper} from "../statistics";

@Fqn(...FQN_NAME)
export class ServerWrapper extends ServerConfig implements ServerWrapperLike {
    protected readonly _pool: PoolWrapperLike;
    protected readonly _controllers: Array<ControllerWrapperLike>;
    protected _name: string;
    constructor(pool: PoolWrapperLike, opt:ServerOption) {
        opt = leyyo.primitive.object(opt) ?? {} as ServerOption;
        super(opt);
        if (opt.name !== undefined) {
            this.name(opt.name);
        }
        this._pool = pool;
        this._controllers = [];
        this._statistics = new StatisticsWrapper(() => this._controllers.map( controller => controller.statistics));
        this.name(opt.name);
    }

    // region pool
    get pool(): PoolWrapperLike {
        return this._pool;
    }
    // endregion pool

    // region name
    get getName(): string {
        return this._name;
    }

    name(name?: string): this {
        this._name = leyyo.primitive.text(name);
        return this;
    }
    // endregion name

    // region controllers
    get controllers(): Array<ControllerWrapperLike> {
        return this._controllers;
    }

    addController(opt: ControllerOption): ControllerWrapperLike {
        const controller = new ControllerWrapper(this, opt);
        this._controllers.push(controller);
        return controller;
    }


    controllerByFolder(folder?: string, mandatory?: boolean): ControllerWrapperLike {
        folder = leyyo.primitive.text(folder);
        const list = this._controllers.filter(controller => controller.getFolder === folder);
        if (list.length > 0) {
            return list[0];
        }
        if (!mandatory) {
            return null;
        }
        throw new DeveloperException('wrapper-server.not.found', {folder}).with(this);
    }

    controllerByIdentifier(identifier?: string, mandatory?: boolean): ControllerWrapperLike {
        identifier = leyyo.primitive.text(identifier);
        const list = this._controllers.filter(controller => controller.getIdentifier === identifier);
        if (list.length > 0) {
            return list[0];
        }
        if (!mandatory) {
            return null;
        }
        throw new DeveloperException('wrapper-server.not.found', {identifier}).with(this);
    }
    // endregion controllers
}
