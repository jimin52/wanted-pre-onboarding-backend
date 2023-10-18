import { NextFunction, Request, Response } from 'express';
import { allRecruits } from './recruit.service';

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
) => {};

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
