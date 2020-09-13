export interface IInterpreteViewModal {
    boundaryId: string,
    jsonSchema: any,
    dataSchema?: any,
    uiSchema: any,
    throwErrorInvalidSchema?: boolean,
    baseFormProperties?: any,
    productionMode: boolean,
    onSaveEvent?: Function
}