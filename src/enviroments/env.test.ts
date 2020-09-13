import { IEnvironment } from "shared-module/interfaces/IEnvironment";

export const testEnv: IEnvironment = {
    httpClient: 'axios',
    retalApiPublicUrl: 'https://0ykitapo84.execute-api.us-east-1.amazonaws.com/qa/',
    appEnableUITheme: 'default',
    enableConsoleLogs: true,
    useRemoteLoggerStore: false
};