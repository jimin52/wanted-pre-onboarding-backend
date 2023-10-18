import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const NumberSchema = z
	.string()
	.refine((value) => !isNaN(Number(value)), {
		message: 'Not a Number',
	})
	.transform((v) => parseInt(v, 10));

export const ErrorMessageSchema = z.string().min(1);

export const ZodErrorMessageSchema = z.object({
	errors: z.array(
		z.object({
			code: z.string().min(1),
			message: z.string().min(1),
		}),
	),
});

export const ParamIdSchema = z.object({
	id: NumberSchema,
});

/************************/
/*	 openapi schemas	*/
/************************/
export const BadRequestConfig = {
	description: 'Bad Request',
	content: {
		'application/json': {
			schema: ZodErrorMessageSchema.openapi('ZodError'),
		},
	},
};

export const NotFoundConfig = {
	description: 'Not Found',
	content: {
		'application/json': {
			example: 'not found',
			schema: ZodErrorMessageSchema.openapi('ZodError'),
		},
	},
};

export const ConflictConfig = {
	description: 'Conflict',
	content: {
		'application/json': {
			example: 'conflict',
			schema: ZodErrorMessageSchema.openapi('ZodError'),
		},
	},
};

export const UnprocessableEntityConfig = {
	description: 'Unprocessable Entity',
	content: {
		'application/json': {
			example: 'Unprocessable Entity',
			schema: ZodErrorMessageSchema.openapi('ZodError'),
		},
	},
};

export const InternalServerErrorConfig = {
	description: 'Internal Server Error',
	content: {
		'application/json': {
			example: 'internal server error',
			schema: ZodErrorMessageSchema.openapi('ZodError'),
		},
	},
};
