import {ControllerClear, ControllerConfig} from "../controller";
import {EndpointConfigLike, EndpointOption} from "./index-types";
import {leyyo} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class EndpointConfig extends ControllerConfig implements EndpointConfigLike {
    protected _description: string;
    protected _fullUrl: string;
    protected _clearController: Array<ControllerClear>;

    constructor(opt: EndpointOption) {
        opt = leyyo.primitive.object(opt) ?? {} as EndpointOption;
        super(opt);
        if (opt.description !== undefined) {
            this.description(opt.description);
        }
        if (opt.fullUrl !== undefined) {
            this.fullUrl(opt.fullUrl);
        }
        if (opt.clearController !== undefined) {
            this.clearController(...opt.clearController);
        }
    }

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


    // region clearController
    get getClearController(): Array<ControllerClear> {
        return this._clearController ?? [];
    }

    clearController(...fields: Array<ControllerClear>): this {
        if (!this._clearController) {
            this._clearController = [];
        }
        fields.forEach(field => {
            if (!this._clearController.includes(field)) {
                this._clearController.push(field)
            }
        })
        return this;
    }

    // endregion clearController

}