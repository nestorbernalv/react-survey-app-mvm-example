import { ICountryTerms } from "shared-module/interfaces/ICountryTerms";

//TODO Must implement eficint mechanism to get the Country through URL (URL model must define the inclusion of "country" segment).
const currentCountry: string = 'cl';

class STermsTranslatorService {

    private baseTranslator: string;
    private baseContext: string;
    private baseDictionary: any;

    constructor(baseTranslator: string) {
        this.baseTranslator = baseTranslator;
        this.baseContext = '';
        this.baseDictionary = null;
    }

    getBaseDictionary = async(context?: string) => {
        switch(this.baseTranslator) {
            case 'country':
                const countryContext: string = currentCountry;
                const loadedModule = await import('./country-terms/'+countryContext+'Terms');
                const countryTerms: ICountryTerms = loadedModule.clTerms;
                const terms: any = countryTerms.terms;
                const baseContext: string = context ? context : this.baseContext;
                terms.forEach((term: any) => {
                    if (term.context === baseContext.toLowerCase()) {
                        this.baseContext = term.context;
                        this.baseDictionary = term.dictionary;
                    }
                });
            break;
        }
    }

    translate = async (context: string, key: string) => {
        if(this.baseContext !== context.toLowerCase()) {
            await this.getBaseDictionary(context);
        }
        if (this.baseDictionary !== null) {
            return this.baseDictionary[key];
        }

        return '';
    }
}
export default STermsTranslatorService;