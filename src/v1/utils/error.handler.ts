// error handling middleware

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Zoderror
	if (err.name === 'ZodError') {
		return res.status(400).json({ error: JSON.parse(err.message) });
	}
	console.error(err);
	return res.status(500).json({ error: err.message });
};
