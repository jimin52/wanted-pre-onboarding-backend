import { Router } from 'express';
import * as ApplicationController from './application.controller';
import {
	validateBodyWithZod,
	validateParamsWithZod,
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
	validateParamsWithZod(ParamIdSchema),
	ApplicationController.getApplication,
);
ApplicationRouter.put(
	'/:id',
	validateParamsWithZod(ParamIdSchema),
	validateBodyWithZod(ApplicationPutRequestSchema),
	ApplicationController.putApplication,
);
ApplicationRouter.delete(
	'/:id',
	validateParamsWithZod(ParamIdSchema),
	ApplicationController.deleteApplication,
);
export default ApplicationRouter;
