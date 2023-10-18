import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { NumberSchema } from '../utils/global.schema';

extendZodWithOpenApi(z);

export const CompanySchema = z.object({
	id: NumberSchema,
	name: z.string().min(1),
	country: z.string().min(1),
	region: z.string().min(1),
});

export const RecruitBodySchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	title: z.string().min(1),
	compensation: NumberSchema,
	techStacks: z.array(z.string()).min(1),
	description: z.string().min(10),
});

export type RecruitBodyType = z.infer<typeof RecruitBodySchema>;

export const RecruitWithTechstackSchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	title: z.string().min(1),
	compensation: NumberSchema,
	techStacks: z.array(z.string().min(1)),
	description: z.string().min(20).describe('상세정보'),
});

export type RecruitWithTechstackType = z.infer<
	typeof RecruitWithTechstackSchema
>;
