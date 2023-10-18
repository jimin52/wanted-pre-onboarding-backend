import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { makeApplicationOpenApi } from '../application/router/application.openapi';
import { makeRecruitOpenApi } from '../recruit/router/recruit.openapi';

export const registry = new OpenAPIRegistry();

makeApplicationOpenApi();
makeRecruitOpenApi();

export function getOpenApiDocumentation() {
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'My API',
			description: 'This is the API',
		},
		servers: [{ url: 'http://localhost:3000/v1' }],
	});
}
