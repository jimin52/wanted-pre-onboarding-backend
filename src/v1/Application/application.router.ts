import { Router } from 'express';
import * as ApplicationController from './application.controller';
import {
	validateBodyWithZod,
	validateParamWithZod,
	validateQueryWithZod,
} from '../utils/zod.validator';
import {
	ApplicationGetQuerySchema,
	ApplicationPostRequestSchema,
	ApplicationDetailGetResponseSchema,
	ApplicationPutRequestSchema,
} from './application.schema';
import { ParamIdSchema } from '../utils/global.schema';

const ApplicationRouter = Router();

ApplicationRouter.get(
	'/',
	validateQueryWithZod(ApplicationGetQuerySchema),
	ApplicationController.getApplications,
);
ApplicationRouter.post(
	'/',
	validateBodyWithZod(ApplicationPostRequestSchema),
	ApplicationController.postApplication,
);
ApplicationRouter.get(
	'/detail/:id',
	validateQueryWithZod(ApplicationDetailGetResponseSchema),
	ApplicationController.getApplicationDetail,
);
ApplicationRouter.get(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	ApplicationController.getApplication,
);
ApplicationRouter.put(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	validateBodyWithZod(ApplicationPutRequestSchema),
	ApplicationController.putApplication,
);
ApplicationRouter.delete(
	'/:id',
	validateParamWithZod(ParamIdSchema),
	ApplicationController.deleteApplication,
);
export default ApplicationRouter;
