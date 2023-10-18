import { NextFunction, Request, Response } from 'express';
import {
	findAllRecruits,
	createRecruit,
	findRecruitById,
	upsertRecruit,
	deleteRecruitById,
} from '../service/recruit.service';
import {
	ValidBodyRequest,
	ValidParamRequest,
} from 'src/v1/utils/zod.validator';
import { RecruitBodySchema } from '../recruit.schema';
import { ParamIdSchema } from 'src/v1/utils/global.schema';

export const getRecruits = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mockRecruits = await findAllRecruits();
		res.status(200).json(mockRecruits);
	} catch (err) {
		next(err);
	}
};

export const postRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const safeRecruit = (req as ValidBodyRequest<typeof RecruitBodySchema>)
			.validBody;
		const recruit = await createRecruit(safeRecruit);
		res.status(200).json(recruit);
	} catch (err) {
		next(err);
	}
};

export const getRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = (req as ValidParamRequest<typeof ParamIdSchema>).validParam.id;
		const recruit = await findRecruitById(id);
		res.status(200).json(recruit);
	} catch (err) {
		next(err);
	}
};

export const putRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = (req as ValidParamRequest<typeof ParamIdSchema>).validParam.id;
		const safeRecruit = (req as ValidBodyRequest<typeof RecruitBodySchema>)
			.validBody;
		const recruit = await upsertRecruit(id, safeRecruit);
		res.status(200).json(recruit);
	} catch (err) {
		next(err);
	}
};

export const deleteRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = (req as ValidParamRequest<typeof ParamIdSchema>).validParam.id;
		await deleteRecruitById(id);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
