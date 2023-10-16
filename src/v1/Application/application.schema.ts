import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { NumberSchema } from '../utils/global.schema';

extendZodWithOpenApi(z);
export const ApplicationGetQuerySchema = z.object({
	search: z.string(),
});

export const ApplicationGetResponseSchema = z
	.array(
		z.object({
			id: NumberSchema,
			company: z.object({
				id: NumberSchema,
				name: z.string().min(1),
				contry: z.string().min(1),
				region: z.string().min(1),
			}),
			position: z.string().min(1),
			compensation: z.string().min(1),
			techStack: z.array(z.string()).min(1),
		}),
	)
	.min(1);

export const ApplicationDetailGetResponseSchema = z.object({
	id: z.number(),
	company: z.object({
		id: NumberSchema,
		name: z.string().min(1),
		contry: z.string().min(1),
		region: z.string().min(1),
	}),
	position: z.string().min(1),
	compensation: z.string().min(1),
	techStack: z.array(z.string()).min(1),
	description: z.string().min(20),
});

export const ApplicationPostRequestSchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	compensation: z.string().min(1),
	techStack: z.array(z.string()).min(1),
	description: z.string().min(20),
});

export const ApplicationPutRequestSchema = z.object({
	position: z.string().min(1),
	compensation: z.string().min(1),
	techStack: z.array(z.string()).min(1),
	description: z.string().min(20),
});
