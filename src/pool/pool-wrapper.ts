import {Fqn} from "@leyyo/fqn";
import {COMPONENT_NAME, FQN_NAME} from "../internal-component";
import {DeveloperException, leyyo} from "@leyyo/core";
import {PoolOption, PoolWrapperLike} from "./index-types";
import {PoolConfig} from "./pool-config";
import {ServerOption, ServerWrapper, ServerWrapperLike} from "../server";
import {StatisticsWrapper} from "../statistics";

@Fqn(...FQN_NAME)
class PoolWrapper extends PoolConfig implements PoolWrapperLike {
    private readonly _servers: Map<string, ServerWrapperLike>;
    private static readonly _DEF_NAME = 'default';

    constructor(opt?: PoolOption) {
        super(opt);
        this._servers = new Map<string, ServerWrapperLike>();
        this._servers.set(PoolWrapper._DEF_NAME, new ServerWrapper(this, {name: PoolWrapper._DEF_NAME}));
        this._statistics = new StatisticsWrapper(() => Array.from(this._servers.values()).map( server => server.statistics));
    }

    addServer(opt: ServerOption): ServerWrapperLike {
        opt = leyyo.primitive.object(opt) ?? {};
        opt.name = leyyo.primitive.text(opt.name);
        if (!opt?.name) {
            throw new DeveloperException('wrapper-server.empty-name', {}).with(this);
        }
        if (this._servers.has(opt.name)) {
            throw new DeveloperException('wrapper-server.already.exists', {name: opt.name}).with(this);
        }
        const server = new ServerWrapper(this, opt);
        this._servers.set(opt.name, server);
        return server;
    }

    get servers(): Map<string, ServerWrapperLike> {
        return this._servers;
    }

    serverByName(name: string, mandatory?: boolean): ServerWrapperLike {
        const given = name;
        name = leyyo.primitive.text(name);
        if (!name) {
            if (!mandatory) {
                return null;
            }
            throw new DeveloperException('wrapper-server.empty-name', {name: given}).with(this);
        }
        if (!this._servers.has(name)) {
            if (!mandatory) {
                return null;
            }
            throw new DeveloperException('wrapper-server.not.found', {name}).with(this);
        }
        return this._servers.get(name);
    }

    get serverDefault(): ServerWrapperLike {
        return this.serverByName(PoolWrapper._DEF_NAME, true);
    }

    static {
        leyyo.component.add(COMPONENT_NAME);
    }
}
export const poolWrapper = new PoolWrapper();