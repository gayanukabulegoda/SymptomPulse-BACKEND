import axios from 'axios';
import logger from "../utils/logger";


export const fdaService = {
    async searchDrugEvents(symptoms: string[]) {
        try {
            const response = await axios.get('https://api.fda.gov/drug/event.json', {
                params: {
                    search: `patient.reaction.reactionmeddrapt:(${symptoms.join('+')})`,
                    limit: 5,
                }
            });

            return response.data.results.map((event: any) => ({
                drug: event.patient.drug?.[0]?.medicinalproduct || 'Unknown',
                reaction: event.patient.reaction?.[0]?.reactionmeddrapt || 'Unknown'
            }));
        } catch (error) {
            logger.error('FDA API Error:', error);
            return [];
        }
    }
};