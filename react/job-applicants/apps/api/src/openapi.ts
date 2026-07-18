import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { basicInfoRegistry } from './modules/applicants/basic-info/openapi.js';
// import { skillsRegistry } from './modules/skills/openapi.js';

const registry = new OpenAPIRegistry([
    basicInfoRegistry,
    // skillsRegistry,
]);

export function generateOpenApiDocument() {
    return new OpenApiGeneratorV3(registry.definitions).generateDocument({
        openapi: '3.0.0',
        info: { title: 'Job Applicants API', version: '1.0.0' },
    });
}