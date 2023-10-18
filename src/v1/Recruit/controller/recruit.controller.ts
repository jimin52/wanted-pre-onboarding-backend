import { NextFunction, Request, Response } from 'express';
import { allRecruits, createRecruit } from '../service/recruit.service';
import { ValidBodyRequest } from 'src/v1/utils/zod.validator';
import { RecruitBodySchema } from '../recruit.schema';

export const getRecruits = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mockRecruits = await allRecruits();
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
) => {};

export const putRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

export const deleteRecruit = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
