import { NextFunction, Request, Response } from 'express';
import * as ApplicationService from './application.service';
import { ValidQueryRequest } from '../utils/zod.validator';
import { ApplicationGetQuerySchema } from './application.schema';

export const getApplications = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validReq = req as ValidQueryRequest<typeof ApplicationGetQuerySchema>; // 미들웨어에서 검증한 타입이므로 타입 단언 사용.
		const validSearch = validReq.validQuery.search;
		const application = await ApplicationService.getApplications(validSearch);
		return res.status(200).json(application);
	} catch (error: any) {
		next(error);
	}
};

export const postApplication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const getApplication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const putApplication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const deleteApplication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const getApplicationDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
