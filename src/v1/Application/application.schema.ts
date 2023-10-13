import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);
export const ApplicationGetQuerySchema = z.object({
	search: z.string().min(1).max(255),
});

export const ApplicationGetResponseSchema = z.object({
	id: z.number(),
	company: z.object({
		id: z.number(),
		name: z.string(),
		contry: z.string(),
		region: z.string(),
	}),
	position: z.string(),
	compensation: z.string(),
	techStack: z.array(z.string()),
});
