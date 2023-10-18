import {
	ApplicationGetResponseSchema,
	ApplicationGetQuerySchema,
	ApplicationPostRequestSchema,
	ApplicationDetailGetResponseSchema,
	ApplicationPutRequestSchema,
} from '../application.schema';
import { ParamIdSchema } from '../../utils/global.schema';
import {
	BadRequestConfig,
	ConflictConfig,
	InternalServerErrorConfig,
	NotFoundConfig,
	UnprocessableEntityConfig,
} from '../../utils/global.schema';
import { registry } from '../../utils/openapi';

export const makeApplicationOpenApi = () => {
	registry.registerPath({
		tags: ['Application'],
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
			400: BadRequestConfig,
			404: NotFoundConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Application'],
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
			400: BadRequestConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Application'],
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
			400: BadRequestConfig,
			404: NotFoundConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Application'],
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
			400: BadRequestConfig,
			404: NotFoundConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Application'],
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
			400: BadRequestConfig,
			404: NotFoundConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Application'],
		method: 'delete',
		path: '/application/:id',
		request: {
			params: ParamIdSchema,
		},
		responses: {
			204: {
				description: 'No Content',
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
};
