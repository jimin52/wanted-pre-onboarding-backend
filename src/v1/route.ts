import { Router } from 'express';

import RecruitRouter from './recruit/router/recruit.router';
import ApplicationRouter from './application/router/application.router';

const v1router = Router();

v1router.use('/recruit', RecruitRouter);
v1router.use('/application', ApplicationRouter);

export default v1router;
