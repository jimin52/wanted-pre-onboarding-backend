import { Router } from 'express';
import * as RecruitController from './recruit.controller';
import {
	validateBodyWithZod,
	validateParamWithZod,
} from '../utils/zod.validator';
import { RecruitBodySchema } from './recruit.schema';
import { ParamIdSchema } from '../utils/global.schema';

const RecruitRouter = Router();

RecruitRouter.get('/', RecruitController.getRecruits);
RecruitRouter.post(
	'/',
	validateBodyWithZod(RecruitBodySchema),
	RecruitController.postRecruit,
);
RecruitRouter.get(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	RecruitController.getRecruit,
);
RecruitRouter.put(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	validateBodyWithZod(RecruitBodySchema),
	RecruitController.putRecruit,
);
RecruitRouter.delete(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	RecruitController.deleteRecruit,
);

export default RecruitRouter;
