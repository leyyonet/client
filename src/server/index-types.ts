import {PoolClear, PoolConfigLike, PoolOption, PoolWrapperLike} from "../pool";
import {ControllerOption, ControllerWrapperLike} from "../controller";

export interface ServerOption extends PoolOption {
    name?: string;

    baseUrl?: string;
    isForm?: boolean;
    clearPool?: Array<PoolClear>;
}
export type ServerExclude = 'name' | 'clearPool';
export type ServerClear = Exclude<keyof ServerOption, ServerExclude>;


export interface ServerConfigLike extends PoolConfigLike {
    // region baseUrl
    get getBaseUrl(): string;
    baseUrl(baseUrl: string): this;
    // endregion baseUrl
    // region isForm
    get getIsForm(): boolean;
    isForm(isForm?: boolean): this;
    // endregion isForm
    // region clearPool
    get getClearPool(): Array<PoolClear>;
    clearPool(...fields: Array<PoolClear>): this;
    // endregion clearPool
}

export interface ServerWrapperLike extends ServerConfigLike {
    // region pool
    get pool(): PoolWrapperLike;
    // endregion pool

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