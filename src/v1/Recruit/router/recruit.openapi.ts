import { RecruitBodySchema } from '../recruit.schema';

import { ParamIdSchema } from '../../utils/global.schema';
import { registry } from '../../utils/openapi';
import {
	BadRequestConfig,
	ConflictConfig,
	InternalServerErrorConfig,
	NotFoundConfig,
	UnprocessableEntityConfig,
} from '../../utils/global.schema';

export const makeRecruitOpenApi = () => {
	registry.registerPath({
		tags: ['Recruit'],
		method: 'get',
		path: '/recruit',
		request: {},
		responses: {
			200: {
				description: '모든 채용공고 조회 성공',
				content: {
					'application/json': {
						schema: RecruitBodySchema.array().openapi('Recruit'),
					},
				},
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Recruit'],
		method: 'post',
		path: '/recruit',
		request: {
			body: {
				content: {
					'application/json': {
						schema: RecruitBodySchema.openapi('Recruit'),
					},
				},
			},
		},
		responses: {
			200: {
				description: '채용공고 생성 성공',
				content: {
					'application/json': {
						schema: RecruitBodySchema.openapi('Recruit'),
					},
				},
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Recruit'],
		method: 'get',
		path: '/recruit/{id}',
		request: {
			params: ParamIdSchema,
		},
		responses: {
			200: {
				description: '채용공고 조회 성공',
				content: {
					'application/json': {
						schema: RecruitBodySchema.openapi('Recruit'),
					},
				},
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Recruit'],
		method: 'put',
		path: '/recruit/{id}',
		request: {
			params: ParamIdSchema,
			body: {
				content: {
					'application/json': {
						schema: RecruitBodySchema.openapi('Recruit'),
					},
				},
			},
		},
		responses: {
			200: {
				description: '채용공고 수정 성공',
				content: {
					'application/json': {
						schema: RecruitBodySchema.openapi('Recruit'),
					},
				},
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
	registry.registerPath({
		tags: ['Recruit'],
		method: 'delete',
		path: '/recruit/{id}',
		request: {
			params: ParamIdSchema,
		},
		responses: {
			200: {
				description: '채용공고 삭제 성공',
			},
			400: BadRequestConfig,
			404: NotFoundConfig,
			409: ConflictConfig,
			422: UnprocessableEntityConfig,
			500: InternalServerErrorConfig,
		},
	});
};
