import app from './index';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
    Running on: http://localhost:${PORT}
  ################################################
  `);
});
