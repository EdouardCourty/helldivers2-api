import HTTPClient from "../HTTPClient.js";
import HttpNotFoundException from "../exception/HttpNotFoundException.js";
import WarInfo from "../model/WarInfo.js";
import WarInfoDenormaliser from "../denormaliser/WarInfoDenormaliser.js";
import HttpErrorException from "../exception/HttpErrorException.js";

export default class WarInfoRepository {
    /**
     * @param warId
     * @returns {Promise<WarInfo>}
     */
    static async getById(warId) {
        try {
            const response = await HTTPClient.getInstance().get('/api/WarSeason/' + warId + '/WarInfo');

            return WarInfoDenormaliser.denormaliseWarInfo(response.data)
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 404) {
                throw new HttpNotFoundException(`War with ID ${warId} not found.`);
            } else {
                throw new HttpErrorException('An error occurred.', error.response.status, error.response);
            }
        }
    }
}
