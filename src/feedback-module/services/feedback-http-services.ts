
import { httpService } from 'core-module/services/http/http-service';

export class FeedbackHttpService {

    private resourceUrl: string = 'feedback';

    saveFeedback = async(data: any, method: string) : Promise<any> => {
        data = JSON.stringify(data);
        switch(method.toLowerCase()) {
            case 'post':
                return httpService.post(this.resourceUrl, data)
                .then((successResponse: any) => {
                    return successResponse;
                })
                .catch((errorResponse: any) => {
                    throw errorResponse;
                });
            break;
            case 'put':
                
            break;
            default:
        }
    }
}