import { developEnv } from './env.develop';
import {  testEnv } from './env.test';
import { productionEnv } from './env.production';
import { IEnvironment } from 'shared-module/interfaces/IEnvironment';

let appEnvironment: IEnvironment = developEnv;

const currentNodeEnv = process.env.NODE_ENV;
if(currentNodeEnv === 'test'){
  appEnvironment = testEnv;
}
if(currentNodeEnv === 'production'){
  appEnvironment = productionEnv;
}

export default appEnvironment;