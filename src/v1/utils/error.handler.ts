// error handling middleware

import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class CustomError extends Error {
	status: number;

	constructor(name: string, message: string, status: number) {
		super(message);
		this.name = name;
		this.status = status;
	}
}

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Zoderror
	if (err instanceof ZodError) {
		console.error(err);
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
	} else if (err instanceof CustomError) {
		return res.status(err.status).json({ error: err.message });
	} else {
		return res.status(500).json({ error: err.message });
	}
};
