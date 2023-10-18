import express, { Request, Response } from 'express';
import v1router from './v1/route';
import { errorHandler } from './v1/utils/error.handler';
import { getOpenApiDocumentation } from './v1/utils/openapi';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';

const app: express.Application = express();
export const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
	res.send('welcome!');
});

app.use(express.json());
app.use('/v1', v1router);

app.use(errorHandler);
const swaggerDocument = getOpenApiDocumentation();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;
