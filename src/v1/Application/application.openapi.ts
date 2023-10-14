import {
	ApplicationGetResponseSchema,
	ApplicationGetQuerySchema,
	ApplicationPostRequestSchema,
	ApplicationDetailGetResponseSchema,
	ApplicationPutRequestSchema,
} from './application.schema';
import {
	ErrorMessageSchema,
	ZodErrorMessageSchema,
	ParamIdSchema,
} from '../utils/global.schema';
import { registry } from '../utils/openapi';

export const makeApplicationOpenApi = () => {
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
			404: {
				description: 'Not Found',
				content: {
					'application/json': {
						example: 'application not found',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
	registry.registerPath({
		method: 'post',
		path: '/application',
		request: {
			body: {
				content: {
					'application/json': {
						schema: ApplicationPostRequestSchema.openapi('Application'),
					},
				},
			},
		},
		responses: {
			204: {
				description: 'No Content',
			},
			400: {
				description: 'Bad Request',
				content: {
					'application/json': {
						example: 'invalid request body',
						schema: ZodErrorMessageSchema.openapi('ZodError'),
					},
				},
			},
			409: {
				description: 'Conflict',
				content: {
					'application/json': {
						example: 'application already exists',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
	registry.registerPath({
		method: 'get',
		path: '/application/detail/:id',
		request: {
			query: ApplicationDetailGetResponseSchema,
		},
		responses: {
			200: {
				description: 'Success',
				content: {
					'application/json': {
						schema: ApplicationDetailGetResponseSchema.openapi('Application'),
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
			404: {
				description: 'Not Found',
				content: {
					'application/json': {
						example: 'application not found',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
	registry.registerPath({
		method: 'get',
		path: '/application/:id',
		request: {
			params: ParamIdSchema,
		},
		responses: {
			200: {
				description: 'Success',
				content: {
					'application/json': {
						schema: ApplicationDetailGetResponseSchema.openapi('Application'),
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
			404: {
				description: 'Not Found',
				content: {
					'application/json': {
						example: 'application not found',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
	registry.registerPath({
		method: 'put',
		path: '/application/:id',
		request: {
			params: ParamIdSchema,
			body: {
				content: {
					'application/json': {
						schema: ApplicationPutRequestSchema.openapi('Application'),
					},
				},
			},
		},
		responses: {
			204: {
				description: 'No Content',
			},
			400: {
				description: 'Bad Request',
				content: {
					'application/json': {
						example: 'invalid request body',
						schema: ZodErrorMessageSchema.openapi('ZodError'),
					},
				},
			},
			404: {
				description: 'Not Found',
				content: {
					'application/json': {
						example: 'application not found',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
	registry.registerPath({
		method: 'delete',
		path: '/application/:id',
		request: {
			params: ParamIdSchema,
		},
		responses: {
			204: {
				description: 'No Content',
			},
			400: {
				description: 'Bad Request',
				content: {
					'application/json': {
						schema: ZodErrorMessageSchema.openapi('ZodError'),
					},
				},
			},
			404: {
				description: 'Not Found',
				content: {
					'application/json': {
						example: 'application not found',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				content: {
					'application/json': {
						example: 'internal server error',
						schema: ErrorMessageSchema.openapi('string'),
					},
				},
			},
		},
	});
};
