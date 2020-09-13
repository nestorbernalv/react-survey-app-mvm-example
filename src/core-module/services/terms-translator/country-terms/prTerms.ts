import { ICountryTerms } from "shared-module/interfaces/ICountryTerms";

export  const prTerms: ICountryTerms = {
    country: 'pr',
    terms: [
        {
            context: 'app',
            dictionary: {
                autofactHomeUrl: 'https://www.autofact.pr',
                redirectTextToHome: 'Ir al sitio principal autofact.pr'
            }
        },
        {
            context: 'survey',
            dictionary: {
                surveyHeaderText: 'encuesta lorem ipsum dolor sit amet lorem ipsum',
                surveyNotAvailable: 'Lo sentimos, pero parece ser que la encuesta que usted solicita no se encuestra disponible.',
                surveyDoneTitle: 'Muchas gracias por dedicar su tiempo a nuestra Encuesta.',
                surveyDoneSubTitle: 'Su feedback es de vital importancia para nosotros.'
            }
        },
        {
            context: 'form-generator',
            dictionary: {
                invalidStatusTitle: 'Lo sentimos, pero no es posible ofrecerle la Encuesta que solicita.',
                invalidStatusSubTitle: 'Puede ser que la encuesta no exista, o no esté aún configurada para su uso.',
                requiredFieldErrorMessage: '* Este campo es obligatorio.',
                formErrorMessage: 'Por favor revise, hay campos vacíos o con valores incorrectos.'
            }
        }
    ]
};