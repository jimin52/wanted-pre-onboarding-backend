import { Router } from 'express';
import * as RecruitController from './recruit.controller';
const RecruitRouter = Router();

RecruitRouter.get('/', RecruitController.getRecruits);
RecruitRouter.post('/', RecruitController.postRecruit);
RecruitRouter.get('/:id', RecruitController.getRecruit);
RecruitRouter.put('/:id', RecruitController.putRecruit);
RecruitRouter.delete('/:id', RecruitController.deleteRecruit);

export default RecruitRouter;