import {CallOption, CallWrapperLike} from "./index-types";
import {EndpointWrapperLike} from "../endpoint";
import {leyyo, RecLike} from "@leyyo/core";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class CallWrapper implements CallWrapperLike, CallOption {
    private readonly _endpoint: EndpointWrapperLike;
    private readonly _header: RecLike;
    private readonly _paths: RecLike;
    private readonly _payload: unknown;
    private readonly _query: RecLike;
    private _tryCount: number;

    constructor(endpoint: EndpointWrapperLike, opt: CallOption) {
        this._endpoint = endpoint;
        this._header = leyyo.primitive.object(opt?.header);
        this._paths = leyyo.primitive.object(opt?.paths);
        this._payload = opt?.payload;
        this._query = leyyo.primitive.object(opt?.query);
        this._tryCount = 0;
    }

    getEndpoint(): EndpointWrapperLike {
        return this._endpoint;
    }
    run<T>(): Promise<T> {
        this._tryCount++;
        return null;
    }
    get tryCount(): number {
        return this._tryCount;
    }

    get header(): RecLike {
        return this._header;
    }

    get paths(): RecLike {
        return this._paths;
    }

    get payload(): unknown {
        return this._payload;
    }

    get query(): RecLike {
        return this._query;
    }
}