import express, { Request, Response } from 'express';

const app: express.Application = express();

const PORT = process.env.PORT || 3000;
app.get('/welcome', (req: Request, res: Response) => {
  res.send('welcome!');
});

export default app;
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
      http://localhost:${PORT}/welcome
  ################################################
    `);
});