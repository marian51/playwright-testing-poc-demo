import { ParamsType } from "../../api/types/basicTypes";
import institutions from "../../resources/institutions.json"

export class TestUtils {

    static getInstitutionParam(institutionAlias: string, param: string): string {
        const institution = institutions[institutionAlias]
        return institution[param]
    }

    static async prepareFilters(params: ParamsType): Promise<string> {
        let paramsString = '?'
        for (const key in params) {
            paramsString = paramsString + 'filterBy=' + key + "&filterValue=" + params[key] + "&"
        }
        return paramsString;
    }
}