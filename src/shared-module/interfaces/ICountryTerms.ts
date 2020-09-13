interface ITerm {
    context: string,
    dictionary: any
}
export interface ICountryTerms {
    country: string,
    terms: ITerm[]
}