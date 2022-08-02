export type AuthorizationGenerator = (...params: Array<unknown>) => Promise<unknown>;

export interface AuthorizationOption {
    timeout?: number;
    maxTry?: number;
    generator? : AuthorizationGenerator;
}

export interface AuthorizationWrapperLike {
    get timeout(): number;
    get maxTry(): number;
    get generator(): AuthorizationGenerator;
    generate(...params: Array<unknown>): Promise<unknown>;
}
