import axios from 'axios';
import {config} from '../config/config';
import prisma from '../../prisma/prisma-client';
import logger from "../utils/logger";
/**
 * @description Service layer for symptom logging and fetching
 * @exports symptomService
 */
export const symptomService = {
    async logSymptoms(userId: number, symptoms: string[]) {
        // Save symptoms to database
        const entry = await prisma.symptomEntry.create({
            data: {
                userId,
                symptoms,
                conditions: {
                    create: await this.fetchConditionSuggestions(symptoms)
                }
            },
            include: {conditions: true}
        });

        return entry;
    },

    async fetchConditionSuggestions(symptoms: string[]) {
        try {
            const response = await axios.get(config.OPENFDA_API_URL, {
                params: {
                    search: `patient.reaction.reactionmeddrapt:(${symptoms.join('+')})`,
                    limit: 5,
                }
            });

            return response.data.results.map((result: any) => ({
                conditionName: result.patient.reaction?.[0]?.reactionmeddrapt || 'Unknown',
                likelihood: 'Medium', // Mock value for demo
                apiSource: 'openFDA'
            }));
        } catch (error) {
            logger.error('FDA API Error:', error);
            return []; // Graceful degradation
        }
    },

    async getHistory(userId: number, page: number = 1, limit: number = 10) {
        return prisma.symptomEntry.findMany({
            where: {userId},
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {entryDate: 'desc'},
            include: {conditions: true}
        });
    }
};