import { AxiosResponse } from 'axios';

import appEnvironment from 'enviroments/env-handler';
import exceptionService from 'core-module/services/exception/exception-service';
import { IAxiosClient } from './clients/axios/IAxiosClient';

class HttpService {
    private static instance: HttpService;
    private httpClient: IAxiosClient | any;

    private constructor() {
        this.httpClient = null;
    }

    static getInstance = () => {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }
        return HttpService.instance;
    }

    private buildBaseService = async() : Promise< IAxiosClient | any > => 
    {
        switch(appEnvironment.httpClient) {
            case 'axios':
                return import('./clients/axios/axios-client')
                .then((loadedModule) => {
                    const axiosClient: IAxiosClient = loadedModule.axiosClient;
                    axiosClient.setHttpInterceptors(
                        /* callback for success response */
                        (response: AxiosResponse<any>) => {
                            let requestMethod: string = response.config.method !== undefined ? response.config.method : '';
                            switch(requestMethod.toLowerCase()) {
                                case 'get':
                                    response = response.data.data !== undefined ? response.data.data : {};
                                break;
                                case 'post':
                                    response = response.data.data !== undefined ? response.data.data : {};
                                break;
                            }
                            return response;
                        }, 
                        /* must return the transformed result from the success function callback? */
                        true,
                        /* callback for error response */
                        (error: Object | string)=>{                     
                            exceptionService.handleException(error);
                        }, 
                        /* must return the transformed result from the error function callback? */
                        false
                    );
                    this.httpClient = axiosClient;
                })
                .catch((error: Object | string) => {
                    exceptionService.handleException(error);
                    throw error;
                });
        }
    }

    get = async(url: string, queryStringParams?: any) : Promise<any> => {
        if (this.httpClient === null) {
            return this.buildBaseService()
            .then((success) => {
                return this.httpClient.get(url, queryStringParams)
                .then((success: any) => {
                    return success;
                })
                .catch((error: any) => {
                    throw error;
                });
            })
            .catch((error) => {
                throw error;
            });
        } else {
            this.httpClient.get(url, queryStringParams)
            .then((success: any) => {
                return success;
            })
            .catch((error: any) => {
                throw error;
            });
        }
    }

    post = async(url: string, data: any) : Promise<any> => {
        if (this.httpClient === null) {
            return this.buildBaseService()
            .then((success) => {
                return this.httpClient.post(url, data)
                .then((success: any) => {
                    return success;
                })
                .catch((error: any) => {
                    throw error;
                });
            })
            .catch((error) => {
                throw error;
            });
        } else {
            return this.httpClient.post(url, data)
            .then((success: any) => {
                return success;
            })
            .catch((error: any) => {
                throw error;
            });
        }
    }

    put = async() => {

    }

    patch = async() => {

    }

    delete = async() => {

    }


}
const httpService: HttpService = HttpService.getInstance();
export {httpService};