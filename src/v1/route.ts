import { Router } from 'express';

import RecruitRouter from './recruit/recruit.router';
import ApplicationRouter from './application/application.router';

const v1router = Router();

v1router.use('/recruit', RecruitRouter);
v1router.use('/application', ApplicationRouter);

export default v1router;
