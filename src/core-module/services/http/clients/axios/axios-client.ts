
import axios, { AxiosResponse } from 'axios';
import appEnvironment from 'enviroments/env-handler';
import { IAxiosResponse } from 'shared-module/interfaces/IAxiosResponse';
import { IAxiosClient } from './IAxiosClient';

class AxiosClient implements IAxiosClient {
    private static instance: AxiosClient;

    private constructor() {
        this.setDefaultConfigs();
    }

    static getInstance = () => {
        if (!AxiosClient.instance) {
            AxiosClient.instance = new AxiosClient();
        }
        return AxiosClient.instance;
    }

    private setDefaultConfigs = () : void => {
        axios.defaults.baseURL = appEnvironment.retalApiPublicUrl;

        /*axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';*/

        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    setHttpInterceptors = (successFn? : Function, mustReturnSuccessFnResult? : boolean, errorFn?: Function, mustReturnErrorFnResult? : boolean) => {
        // Add a response interceptor
        axios.interceptors.response.use(function (response: AxiosResponse<any>) {
            // Any status code that live within the range of 2xx cause this function to trigger
            // Doing something with response data
            if (successFn) {
                let result: any =  successFn(response);
                if (mustReturnSuccessFnResult) {
                    return result;
                }
            }
            return response;
        }, function (error: any) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Doing something with response error
            if (errorFn) {
                let result = errorFn(error);
                if (mustReturnErrorFnResult) {
                    return result;
                }
            }
            throw error;
        });
    }

    get = async(url: string, queryStringParams?: any) : Promise<any> => {
        let configOptions: any = {};
        if (queryStringParams) {
            configOptions.params = queryStringParams;
        }
        return axios.get(url, configOptions)
        .then((success) => {
            return success;
        })
        .catch((error) => {
            throw error;
        });
    }

    post = async(url: string, data: any) : Promise<any> => {
        return axios.post(url, data)
        .then((success) => {
            return success;
        })
        .catch((error) => {
            throw error;
        });
    }


}
const axiosClient: AxiosClient = AxiosClient.getInstance();
export {AxiosClient, axiosClient};