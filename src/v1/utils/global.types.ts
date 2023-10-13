import { z } from 'zod';

export const ZodErrorMessageSchema = z.object({
	errors: z.array(
		z.object({
			code: z.string(),
			message: z.string(),
		}),
	),
});
