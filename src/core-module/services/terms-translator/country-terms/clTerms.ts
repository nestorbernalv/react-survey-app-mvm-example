import { ICountryTerms } from "shared-module/interfaces/ICountryTerms";

export  const clTerms: ICountryTerms = {
    country: 'cl',
    terms: [
        {
            context: 'app',
            dictionary: {
                autofactHomeUrl: 'https://www.autofact.cl',
                redirectTextToHome: 'Ir al sitio principal autofact.cl'
            }
        },
        {
            context: 'survey',
            dictionary: {
                surveyHeaderText: 'encuesta lorem ipsum dolor sit amet lorem ipsum',
                surveyNotAvailable: 'Lo sentimos, pero parece ser que la encuesta que usted solicita no se encuestra disponible.',
                surveyDoneTitle: 'MALL_PLAZA_OESTE',
                surveyDoneSubTitle: '¡Acá tienes tu código! Te agradecemos habernos regalado estos minutos.'
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