export interface ISurveyViewModel {
    surveyId: string | number | null,
    survey?: any | null,
    updateContext?: Function,
    getSurvey?: Function
}