import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export interface ValidBodyRequest<T extends z.ZodType> extends Request {
	validBody: T['_type'];
}

export interface ValidQueryRequest<T extends z.ZodType> extends Request {
	validQuery: T['_type'];
}

export interface ValidParamRequest<T extends z.ZodType> extends Request {
	validParam: T['_type'];
}

export const validateBodyWithZod = <T extends z.ZodType>(schema: T) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);
		if (result.success) {
			(req as ValidBodyRequest<T>).validBody = result.data;
			next();
		} else {
			return next(result.error);
		}
	};
};

export const validateQueryWithZod = <T extends z.ZodType>(schema: T) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.query);
		if (result.success) {
			(req as ValidQueryRequest<T>).validQuery = result.data;
			next();
		} else {
			return next(result.error);
		}
	};
};

export const validateParamsWithZod = <T extends z.ZodType>(schema: T) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.params);
		if (result.success) {
			(req as ValidParamRequest<T>).validParam = result.data;
			next();
		} else {
			return next(result.error);
		}
	};
};
