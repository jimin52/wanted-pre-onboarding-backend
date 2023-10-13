import { Router } from 'express';
import * as ApplicationController from './application.controller';
import { validateQueryWithZod } from '../utils/zod.validator';
import {
	ApplicationGetResponseSchema,
	ApplicationGetQuerySchema,
} from './application.schema';
import { ZodErrorMessageSchema } from '../utils/global.types';
import { registry } from '../utils/openapi';

const ApplicationRouter = Router();

ApplicationRouter.get(
	'/',
	validateQueryWithZod(ApplicationGetQuerySchema),
	ApplicationController.getApplications,
);
ApplicationRouter.post('/', ApplicationController.postApplication);
ApplicationRouter.get('/:id', ApplicationController.getApplication);
ApplicationRouter.put('/:id', ApplicationController.putApplication);
ApplicationRouter.delete('/:id', ApplicationController.deleteApplication);

export default ApplicationRouter;

// zod to openapi paths
registry.registerPath({
	method: 'get',
	path: '/application',
	request: {
		query: ApplicationGetQuerySchema,
	},
	responses: {
		200: {
			description: 'Success',
			content: {
				'application/json': {
					schema: ApplicationGetResponseSchema.openapi('Application'),
				},
			},
		},
		400: {
			description: 'Bad Request',
			content: {
				'application/json': {
					schema: ZodErrorMessageSchema.openapi('ZodError'),
				},
			},
		},
	},
});
