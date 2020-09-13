export interface IEnvironment {
    readonly httpClient: string;
    readonly retalApiPublicUrl: string,
    readonly appEnableUITheme: string,
    readonly enableConsoleLogs: boolean,
    readonly useRemoteLoggerStore: boolean,
    readonly remoteLoggerStoreUrl?: string
}