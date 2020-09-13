
import { httpService } from 'core-module/services/http/http-service';
import { ISurveySearchtemplate } from 'survey-module/interfaces/ISurveySearchTemplate';

export class SurveyHttpService {

    private resourceUrl: string = 'surveys';

    getSurveys =  async (searchTemplate: ISurveySearchtemplate) : Promise<any> => {
        let resourceUrl = this.resourceUrl;
        if (searchTemplate.id) {
            resourceUrl += '/' + searchTemplate.id;
        }
        let queryStringParams: any = {};
        if (searchTemplate.enabled) {
            queryStringParams.enabled = searchTemplate.enabled;
        }
        if (searchTemplate.keyString) {
            queryStringParams.keyString = searchTemplate.keyString;
        }
        if (searchTemplate.offset) {
            queryStringParams.offset = searchTemplate.offset;
        }
        if (searchTemplate.limit) {
            queryStringParams.limit = searchTemplate.limit;
        }
        return httpService.get(resourceUrl, queryStringParams)
        .then((successResponse) => {
            return successResponse;
        })
        .catch((errorResponse) => {
            throw errorResponse;
        });
    }
}