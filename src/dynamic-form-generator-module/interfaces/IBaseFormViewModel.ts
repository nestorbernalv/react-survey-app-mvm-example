export interface IBaseFormViewModal {
    formId: string,
    formTitle?: string | null,
    formDescription?: string | null,
    requiredFields?: string[],
    fields?: any[] | null,
    boundaryId: string,
    actions?: any[],
    uuid: string,
    onResolveForm: Function,
    scrollFunction: Function
}