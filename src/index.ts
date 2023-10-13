import express, { Request, Response } from 'express';
import v1router from './v1/route';
import { errorHandler } from './v1/utils/error.handler';
const app: express.Application = express();

const PORT = process.env.PORT || 3000;
app.get('/welcome', (req: Request, res: Response) => {
  res.send('welcome!');
});

app.use('/v1', v1router);
app.use(errorHandler);
export default app;
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
      Running on: http://localhost:${PORT}/welcome
  ################################################
    `);
});