import { z } from 'zod';

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
