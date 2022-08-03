import {PoolClear, PoolConfigLike, PoolExclude, PoolOption, PoolWrapperLike} from "../pool";
import {ControllerOption, ControllerWrapperLike} from "../controller";

export interface ServerOption<C = PoolClear> extends PoolOption<C> {
    name?: string;
    // region specials
    // endregion specials

    // region properties
    // endregion properties
    baseUrl?: string;
    isForm?: boolean;
}
export type ServerExclude = PoolExclude | 'name';
export type ServerClear = Exclude<keyof ServerOption, ServerExclude>;

export interface ServerConfigLike<C = PoolClear> extends PoolConfigLike<C> {
    // region baseUrl
    get getBaseUrl(): string;
    baseUrl(baseUrl: string): this;
    // endregion baseUrl
    // region isForm
    get getIsForm(): boolean;
    isForm(isForm?: boolean): this;
    // endregion isForm
}

export interface ServerWrapperLike extends ServerConfigLike {
    // region pool
    get pool(): PoolWrapperLike;
    // endregion pool

    // region specials
    // endregion specials
    // region name
    get getName(): string;
    name(name?: string): this;
    // endregion name

    // region controllers
    get controllers(): Array<ControllerWrapperLike>;
    addController(opt: ControllerOption): ControllerWrapperLike;
    controllerByFolder(folder?: string, mandatory?: boolean): ControllerWrapperLike;
    controllerByIdentifier(identifier?: string, mandatory?: boolean): ControllerWrapperLike;
    // endregion controllers
}