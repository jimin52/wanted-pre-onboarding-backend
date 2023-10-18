import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { NumberSchema } from '../utils/global.schema';
import { Recruitment } from '@prisma/client';

extendZodWithOpenApi(z);

export const RecruitBodySchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	title: z.string().min(1),
	compensation: NumberSchema,
	techStacks: z.array(z.string()).min(1),
	description: z.string().min(20),
});

export type RecruitBodyType = z.infer<typeof RecruitBodySchema>;

export const TechstackSchema = z.object({
	name: z.string(),
});

export const RecruitWithTechstackSchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	title: z.string().min(1),
	compensation: NumberSchema,
	techStacks: z.array(TechstackSchema),
	description: z.string().min(20),
});

export type RecruitWithTechstackType = z.infer<
	typeof RecruitWithTechstackSchema
>;
