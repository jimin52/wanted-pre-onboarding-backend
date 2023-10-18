import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { NumberSchema } from '../utils/global.schema';

extendZodWithOpenApi(z);

export const RecruitBodySchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	title: z.string().min(1),
	compensation: NumberSchema,
	techStacks: z.array(z.string()).min(1),
	description: z.string().min(20),
});

export type Recruitment = ShortRecruitment & {
	description: string;
};

export type ShortRecruitment = {
	companyId: number;
	title: string;
	position: string;
	compensation: number;
	techStacks: string[];
};
