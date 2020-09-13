import { IEnvironment } from "shared-module/interfaces/IEnvironment";

export const developEnv : IEnvironment = {
    httpClient: 'axios',
    retalApiPublicUrl: 'http://localhost:3000',
    //retalApiPublicUrl: 'https://998bm2b865.execute-api.us-east-1.amazonaws.com/qa/',
    appEnableUITheme: 'default',
    enableConsoleLogs: true,
    useRemoteLoggerStore: false
};