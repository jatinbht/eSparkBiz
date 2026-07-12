import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { BasicInfoQuerySchema } from './schema.js';
import { z } from 'zod';
import { IdSchema } from '@job-applicants/schemas';

export const basicInfoRegistry = new OpenAPIRegistry();

basicInfoRegistry.registerPath({
    method: 'get',
    path: '/api/applicants',
    // summary: 'List paginated applicants',
    request: {
        query: BasicInfoQuerySchema,
    },
    responses: {
        200: {
            description: 'Paginated list of applicants',
        },
        302: {
            description: 'Redirect when page exceeds pageCount',
        },
    },
});

// basicInfoRegistry.registerPath({
//     method: 'get',
//     path: '/api/applicants/distinct/{column}',
//     request: {
//         params: z.object({
//             column: distinctColumnSchema,
//         }),
//     },
//     responses: {
//         200: { description: 'Distinct values for the given column' },
//     },
// });

basicInfoRegistry.registerPath({
    method: 'get',
    path: '/api/applicants/filter-options',
    responses: {
        200: { description: 'Filter options (distinct values) for applicants' },
    },
});

basicInfoRegistry.registerPath({
    method: 'get',
    path: '/api/applicants/{id}',
    request: {
        params: IdSchema,
    },
    responses: {
        200: {
            description: 'Details of an applicant',
        },
    },
});
