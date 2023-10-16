import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { NumberSchema } from '../utils/global.schema';

extendZodWithOpenApi(z);

export const RecruitBodySchema = z.object({
	companyId: NumberSchema,
	position: z.string().min(1),
	compensation: z.string().min(1),
	techStack: z.array(z.string()).min(1),
	description: z.string().min(20),
});

export type Recruitment = {
	id: number;
	companyId: number;
	position: string;
	compensation: string;
	techStack: string[];
	description: string;
};
