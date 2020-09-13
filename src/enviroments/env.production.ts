import { IEnvironment } from 'shared-module/interfaces/IEnvironment';

export const productionEnv: IEnvironment = {
  httpClient: 'axios',
  retalApiPublicUrl: 'https://998bm2b865.execute-api.us-east-1.amazonaws.com/qa/',
  appEnableUITheme: 'default',
  enableConsoleLogs: true,
  useRemoteLoggerStore: false
};
