import {StatisticsChildLambda, StatisticsWrapperLike} from "./index-types";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";

@Fqn(...FQN_NAME)
export class StatisticsWrapper implements StatisticsWrapperLike {
    private readonly _errorMap: Map<string, number>;
    private readonly _childLambda: StatisticsChildLambda;
    private _errorCount: number;
    private _successCount: number;
    private _duration: number;

    constructor(childLambda?: StatisticsChildLambda) {
        this._errorMap = new Map<string, number>();
        if (typeof childLambda === 'function') {
            this._childLambda = childLambda;
        }
        this.clear();
    }
    get errorCount(): number {
        return this._errorCount;
    }

    get errorMap(): Map<string, number> {
        return this._errorMap;
    }

    get successCount(): number {
        return this._successCount;
    }

    clear(): void {
        this._errorMap.clear();
        this._errorCount = 0;
        this._successCount = 0;
        this._duration = 0;
        if (this._childLambda) {
            try {
                const children = this._childLambda();
                if (children) {
                    children.forEach(child => {
                        child.clear();
                    });
                }
            } catch (e) {
            }
        }
    }

    error(e: Error): void {
        this._errorCount++;
        const key = e.name;
        if (!this._errorMap.has(key)) {
            this._errorMap.set(key, 1);
        } else {
            this._errorMap.set(key, this._errorMap.get(key) + 1);
        }
    }

    success(duration: number): void {
        this._successCount++;
        this._duration += duration;
    }

    get duration(): number {
        return this._duration;
    }

}