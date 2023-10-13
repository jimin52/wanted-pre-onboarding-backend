import { Request, Response } from 'express';
import * as ApplicationService from './application.service';
import { ValidQueryRequest } from '../utils/zod.validator';
import { GetApplicationQuery } from './application.schema';

export const getApplications = async (req: Request, res: Response) => {
	const validReq = req as ValidQueryRequest<typeof GetApplicationQuery>; // 미들웨어에서 검증한 타입이므로 타입 단언 사용.
	const validSearch = validReq.validQuery.search;
	const application = await ApplicationService.getApplications(validSearch);
	return res.status(200).json(application);
};

export const postApplication = async (req: Request, res: Response) => {};

export const getApplication = async (req: Request, res: Response) => {};

export const putApplication = async (req: Request, res: Response) => {};

export const deleteApplication = async (req: Request, res: Response) => {};
