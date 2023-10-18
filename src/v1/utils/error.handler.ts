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
		const issues = err.issues.map((issue) => {
			return {
				code: issue.code,
				message: 'zodError: ' + issue.message,
			};
		});
		return res.status(400).json({
			errors: issues,
		});
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		const message = getPrismaErrorDescription(err.code);
		console.log(err.stack);
		return res.status(400).json({
			code: 'error',
			message: `Prisma error ${err.code}: ${message}`,
		});
	} else if (err instanceof Prisma.PrismaClientValidationError) {
		return res.status(422).json({
			code: 'error',
			message: `Prisma Validation error ${err.name}: ${err.message}`,
		});
	} else if (err instanceof CustomError) {
		return res.status(err.status).json({ error: err.message });
	} else {
		return res.status(500).json({ error: err.message });
	}
};

const getPrismaErrorDescription = (code: string) => {
	const errorMapping: { [key: string]: string } = {
		P2001: '데이터베이스 제약 조건 검증 실패.',
		P2002: '고유 제약 조건 위반.',
		P2003: '외래 키 제약 조건 실패.',
		P2004: '데이터베이스 값이 Null로 설정됨.',
		P2025: '레코드가 존재하지 않아 업데이트나 삭제할 수 없습니다.',
	};
	return errorMapping[code] || '알 수 없는 Prisma error';
};
