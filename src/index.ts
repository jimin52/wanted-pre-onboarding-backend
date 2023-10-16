import express, { Request, Response } from 'express';
import v1router from './v1/route';
import { errorHandler } from './v1/utils/error.handler';
import { getOpenApiDocumentation } from './v1/utils/openapi';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
	res.send('welcome!');
});

app.use(errorHandler);

app.use('/v1', v1router);

const swaggerDocument = getOpenApiDocumentation();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;

app.listen(PORT, () => {
	console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
    Running on: http://localhost:${PORT}
  ################################################
  `);
});
