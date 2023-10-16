// error handling middleware

import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Zoderror
	if (err instanceof ZodError) {
		const issues = err.issues.map((issue) => {
			return {
				code: issue.code,
				message: issue.message,
			};
		});
		return res.status(400).json({
			errors: issues,
		});
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		return res.status(400).json({ error: err.message });
	} else if (err instanceof Prisma.PrismaClientValidationError) {
		return res.status(422).json({ error: err.message });
	} else {
		console.error(err);
		return res.status(500).json({ error: err.message });
	}
};
