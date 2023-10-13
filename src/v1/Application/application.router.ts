import { Router } from 'express';
import * as ApplicationController from './application.controller';
import { validateQueryWithZod } from '../utils/zod.validator';
import { GetApplicationQuery } from './application.schema';

const ApplicationRouter = Router();

ApplicationRouter.get('/', validateQueryWithZod(GetApplicationQuery), ApplicationController.getApplications);
ApplicationRouter.post('/', ApplicationController.postApplication);
ApplicationRouter.get('/:id', ApplicationController.getApplication);
ApplicationRouter.put('/:id', ApplicationController.putApplication);
ApplicationRouter.delete('/:id', ApplicationController.deleteApplication);

export default ApplicationRouter;